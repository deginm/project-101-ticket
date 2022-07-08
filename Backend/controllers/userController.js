const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please include all paremeters")
    }

    // find if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }
    // Hash user Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // add user to database
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (!user) {
        res.status(400)
        throw new Error('Invalid user data');
    }

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token:generateToken(user._id)
    })
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatchs = await bcrypt.compare(password, user.password);

    if (user && passwordMatchs) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(404);
        throw new Error("Invalid username or password")
    }

});

// get current loggedin user
const getLogInUser  = asyncHandler(async (req , res) => { 
        res.send(req.user)
});

// generate user jwt token
const generateToken = (id) => { 
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn: '3d'})
}

module.exports = {
    registerUser,
    loginUser,
    getLogInUser
}