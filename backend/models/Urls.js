const mongoose = require("mongoose");

//mongodb database schema
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  clicks: [{ 
    timestamp: { type: Date, default: Date.now } 
  }], 
  expiresAt: {
    type: Date,
    default: null
  },
  expiresAt: {
    type: Date,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//a virtual property to get the click count without fetching the whole array
urlSchema.virtual('clickCount').get(function() {
  return this.clicks.length;
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
