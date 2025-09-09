const User = require("../models/User.js");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Loads variables from .env file
const bcrypt = require("bcrypt");
const { response } = require("express");

// signup function, this creates a new user document
async function signupUser(req, res) {
  const errors = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 🔐 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "User with that email already exists.",
      });
    }

    const newUser = await User.create({
      email: email,
      password: password,
    });

    const sessionToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .cookie("jwt_token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Logged in successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
}

//login function
async function loginUser(req, res) {
  // validate user input. left outside of the try/catch as we want to use it
  //to validate input and also they are used more for database error handling
  const errors = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!errors.isEmpty()) {
      return res.status(401).json({
        error: "Invalid credentials. Please double-check and try again.",
      });
    }

    const currentUser = await User.findOne({
      email: email,
    });

    if (!currentUser) {
      return res.status(401).json({
        error: "Invalid credentials. Please double-check and try again.",
      });
    }

    const isMatch = await bcrypt.compare(password, currentUser.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials. Please double-check and try again.",
      });
    }

    const sessionToken = jwt.sign(
      { id: currentUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //return http only cookie
    return res
      .cookie("jwt_token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .status(200)
      .json({
        message: "Logged in successfully",
        user: {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
        },
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: error,
    });
  }
}

async function verifyUser(req, res) {
  const verifyUser = req.user;

  if(!verifyUser){
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    return res.status(200).json({ user: verifyUser });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: error,
    });
  }
}

function logoutUser(req, res) {
  // Clear the jwt_token cookie
  res.clearCookie("jwt_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ Only secure in prod
    sameSite: "lax", // ✅ Or "strict" depending on frontend/backend domains
  });

  return res.status(200).json({ message: "Logged out successfully" });
}

module.exports = { loginUser, signupUser, verifyUser, logoutUser };
