const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const jwt = require('jsonwebtoken')
require('dotenv').config();

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).json({
            msg: "please fill out all fields"
        })
    }

    try {
        //create new user in the db
        await User.create({
            username,
            password
        })

        res.json({
            msg: "user created successfully"
        })

    } catch (error) {
        res.status(500).json({
            msg: "error creating user"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(401).json({
            msg: "please fill out all fields"
        })
    }

    try {
        const user = await User.findOne({username : username, password: password})

        if (user) {
            const access_token = jwt.sign({username}, process.env.JWT_SECRET);
            res.json({
                msg: "signin successful", 
                access_token: access_token
            })
        } else {
            res.json({
                msg: "no user found"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "error connecting to db"
        })
    }

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});

    res.json({
        available_courses : courses
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const username = res.locals.username;
    const courseId = req.params.courseId;

    try {
        await User.findOneAndUpdate({username: username}, {$push : {purchasedCourses: courseId}})
    
        res.json({msg: "course added successfully"});

    } catch (error) {
        res.status(500).json({
            msg: "error reaching database"
        })
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = res.locals.username;
    
    try {
        const user = await User.findOne({username: username})
    
        const purchasedCourses = await Course.find({
            _id : {
                $in: user.purchasedCourses
            }
        })
    
        res.json({
            purchasedCourses : purchasedCourses
        })
    } catch (error) {
        res.status(500).json({
            msg: "error reaching database"
        })
    }
});

module.exports = router