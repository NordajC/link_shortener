const mongoose = require('mongoose');

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