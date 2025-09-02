const mongoose = require('mongoose')
const {body, validationResult} = require('express-validator');
const { Router } = require('express');

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema)

module.exports = User;//exports user module so you can access it outside this file

userSchema.pre('save', async function(next) {

  //checks if user has been changed or is new
  if(this.isModified('password') === true){
    const salt = await bcrypt.genSalt(10); //generates a random string that gets mixed in with the password. ensures that even if passwords are the same between different users that the hash is different

    // updates the password saved in the db with a hashed version. hash function takes in 2 args. the password and the salt string to generate a hashed password
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
})

router.post(
  '/signup',
  [
    // Validation rules go here
    body('email').isEmail(),
    // We can add more rules, like for the password
    body('password').isLength({ min: 8 })
  ],
  (req, res) => {
    // Your main logic for creating a user goes here

    const errors = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;

    if(errors.isEmpty()){

    }else{
      
    }

  }
);