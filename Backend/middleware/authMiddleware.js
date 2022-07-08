const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

const protectedRoutes = asyncHandler(async (req, res, next) => {
    let userToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get user token from header
            userToken = req.headers.authorization.split(' ')[1];
            // varify user token
            const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
            // Get user details from token
            req.user = await User.findById(decoded.id).select('-password');
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('not authorized')
        }
    }

    if (!userToken) {
        res.status(401)
        throw new Error('not authorized')
    }
})

module.exports = { protectedRoutes }