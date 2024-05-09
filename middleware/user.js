const jwt = require('jsonwebtoken');
require('dotenv').config();


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    if (!req.headers.authorization) {
        res.status(401).json({
            msg: "please log in"
        })
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        res.status(403).json({msg : 'unauthorized'});
    }


    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (verified) {
            res.locals.username = verified.username;
            next();
        }

    } catch (error) {
        res.status(403).json({msg : 'unauthorized'});
    }

}

module.exports = userMiddleware;

