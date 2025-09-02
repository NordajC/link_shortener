const express = require('express');
const app = express();
const PORT = 3002;
const mongoose = require('mongoose');
require('dotenv').config(); // Loads variables from .env file
const cors = require('cors')

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors());
// In-memory "database" to store our URL mappings
// The key will be the short code, the value will be the long URL
// const urlDatabase = {};

//mongodb database schema
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortCode:{
    type: String,
    required: true,
    unique: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
});



const Url = mongoose.model('Url', urlSchema);

module.exports = Url;




// TODO: The 'Create Short URL' endpoint will go here
app.post('/api/url', async(req, res) => {
  // This is the part you will build
  const longUrl = req.body.longUrl;

    if(!longUrl){
      return res.status(400).json({
        error: 'longUrl is required',
      });
    }  

  try {
    const shortCode = Math.random().toString(36).substring(2, 8);

    await Url.create({
      shortCode: shortCode,
      longUrl: longUrl
    });

    const shortUrl = `http://localhost:${PORT}/${shortCode}`;

    return res.status(201).json({
      shortUrl: shortUrl
    });

  } catch(e){
    console.log(e)

    return res.status(500).json({
      "error": 'Server error occurred',
    })
  }
});

//get long url form DB
app.get('/:shortCode', async(req, res) => {
  const shortCode = req.params.shortCode;

  try {
    let url = await Url.findOne({shortCode: shortCode});

    if(!url){
      return res.status(404).json({        
        error: 'no such link was shortened',
      });
    }
      
    return res.redirect(url.longUrl);
  } catch (e) {
    console.log(e)

    return res.status(500).json({
      "error": 'Server error occurred',
    })
  }
})




app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});