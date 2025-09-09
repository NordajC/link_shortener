const Url = require("../models/Urls.js");
require("dotenv").config(); // Loads variables from .env fileconst shortUrl = `http://localhost:${PORT}/api/url/${shortCode}`;const shortUrl = `http://localhost:${PORT}/api/url/${shortCode}`;

async function createShortUrl(req, res) {
  const longUrl = req.body.longUrl;

  if (!longUrl) {
    return res.status(400).json({
      error: "longUrl is required",
    });
  }

  try {
    const shortCode = Math.random().toString(36).substring(2, 8);

    await Url.create({
      shortCode: shortCode,
      longUrl: longUrl,
    });

    //const shortUrl = `http://localhost:${PORT}/api/url/${shortCode}`;

    return res.status(201).json({
      shortCode: shortCode,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      error: "Server error occurred",
    });
  }
}

async function getLongUrl(req, res) {
  const shortCode = req.params.shortCode;

  try {
    let url = await Url.findOne({ shortCode: shortCode });

    if (!url) {
      return res.status(404).json({
        error: "no such link was shortened",
      });
    }

    return res.redirect(url.longUrl);
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      error: "Server error occurred",
    });
  }
}

module.exports = { createShortUrl, getLongUrl };
