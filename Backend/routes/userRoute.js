const express = require('express')
const router = express.Router();
const { registerUser, loginUser, getLogInUser } = require('../controllers/userController');
const { protectedRoutes } = require('../middleware/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/profile', protectedRoutes, getLogInUser)
module.exports = router;