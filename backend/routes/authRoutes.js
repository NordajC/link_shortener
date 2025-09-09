const express = require('express');
const {body} = require('express-validator');
const {signupUser, loginUser, verifyUser, logoutUser} = require('../controllers/authController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post(
  '/signup',
  [
    // Validation rules go here
    body('email').isEmail(),
    // We can add more rules, like for the password
    body('password').isLength({ min: 8 })
  ],
  signupUser
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isLength({min: 1})
  ],
  loginUser
);

//logout
router.post("/logout", logoutUser); 

//verify user as they enter the page
router.get('/verify', [ authMiddleware ], verifyUser); 


module.exports = router;