const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config(); // Loads variables from .env file
const cors = require('cors')
const auth = require('./routes/authRoutes.js');
const url = require('./routes/urlRoutes.js');
const {getLongUrl} = require('./controllers/urlController.js')
const cookieParser = require('cookie-parser');
require('./redis/redisClient.js');

const corsOptions = {
  origin: process.env.VITE_FRONTEND_URL, // frontend URL
  credentials: true, // <-- IMPORTANT to allow cookies
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// In-memory "database" to store our URL mappings
// The key will be the short code, the value will be the long URL
// const urlDatabase = {};

app.use('/', url);

//use function that identifies the selected path and routes it to the authRouter
//auth router has a custom middle ware that validates user credentials in authController
// it then creates a new user id
app.use('/api/auth', auth);

const PORT = process.env.PORT || process.env.VITE_BACKEND_PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${process.env.VITE_BACKEND_PORT}`);
});