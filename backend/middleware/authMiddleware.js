const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Loads variables from .env file
//const cookieParser = require("cookie-parser");

const authMiddleware = (req, res, next) => {
  try {
    //get token from cookie
    const token = req.cookies.jwt_token;

    //verify if token is present
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //verify and decode token to get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //attach userId to session user
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

module.exports = { authMiddleware };
