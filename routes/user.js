const express = require('express');
 const { signup, login, forgetPassword, resetPassword }  = require('..//controller/user');

 const router = express.Router();

// User registration route
router.post('/signup', signup);

// User login route
router.post('/login', login);

// Forget password route
router.post('/forgetpassword', forgetPassword);

// Reset password route
router.post('/resetpassword/:token', resetPassword);

module.exports = router;
