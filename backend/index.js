const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config(); // Loads variables from .env file
const cors = require("cors");
const auth = require("./routes/authRoutes.js");
const url = require("./routes/urlRoutes.js");
const { getLongUrl } = require("./controllers/urlController.js");
const cookieParser = require("cookie-parser");
const { limiter, speedLimiter } = require("./middleware/rateLimiter.js");
require("./redis/redisClient.js");
const logger = require("./config/logger.js");

const corsOptions = {
  origin: process.env.VITE_FRONTEND_URL, // frontend URL
  credentials: true, // <-- IMPORTANT to allow cookies
};

const PORT = process.env.PORT || process.env.VITE_BACKEND_PORT || 3002;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "test" }) // Replace DB name
  .then(() =>
    logger.info(`MongoDB connected successfully to DB: test`)
  )
  .catch((err) =>
    logger.error({ message: "MongoDB connection error", error: err })
  );
// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// In-memory "database" to store our URL mappings
// The key will be the short code, the value will be the long URL
// const urlDatabase = {};
// Add this middleware to log incoming requests
app.use((req, res, next) => {
  // The 'PORT' variable is the one defined at the top of your file
  logger.info(`Request received on port ${PORT}`); // console.log(`Request received on port ${PORT}`);
  next(); // This tells Express to continue to the next route handler
});

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use("/", url);

//use function that identifies the selected path and routes it to the authRouter
//auth router has a custom middle ware that validates user credentials in authController
// it then creates a new user id
app.use("/api/auth", limiter, speedLimiter, auth);

app.use("/api/url", limiter, speedLimiter, url);

app.get("/:shortCode", limiter, speedLimiter, getLongUrl);

let server; // Keep track of the server instance
if (require.main === module) {
  server = app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
  });
}

module.exports = { app };
