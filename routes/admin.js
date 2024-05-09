const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken')
require('dotenv').config();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    try {
        await Admin.create({
            username,
            password
        })
        res.json({
            msg: "Admin created successfully"
        })

    } catch (error) {
        res.status(500).json({
            msg: "error reaching database"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    // console.log(username, password)

    try {
        const admin = await Admin.findOne({ username: username, password: password });
        // console.log(admin)

        if (admin) {
            const access_token = jwt.sign({username}, process.env.JWT_SECRET);

            res.json({
                msg: "signed in successfully",
                access_token: access_token
            })
        } else {
            res.json({msg: "admin doesn't exist"});
        }

    } catch (error) {
        res.status(500).json({
            msg: "error reaching database"
        })
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const username = res.locals.username;
    const { title, description, imageLink, price } = req.body;

    try {
        const course = await Course.create({
            title, description, imageLink, price
        })

        // console.log(course._id)

        await Admin.findOneAndUpdate({username: username}, {
            $push : {
                createdCourses: course._id
            }
        })

        res.json({
            msg: "course created successfully"
        })


    } catch (error) {
        res.status(500).json({
            msg: "error reaching database"
        })
    }

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const username = res.locals.username;

    
    try {
        const admin = await Admin.findOne({username: username});
        // console.log(admin.createdCourses);
        
        const courses = await Course.find({
            _id: {
                $in : admin.createdCourses
            }
        });

        res.json({
            courses: courses
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "error reaching database"
        })
    }


});

module.exports = router;