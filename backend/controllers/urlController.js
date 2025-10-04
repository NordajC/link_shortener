const Url = require("../models/Urls.js");
require("dotenv").config(); // Loads variables from .env fileconst shortUrl = `http://localhost:${PORT}/api/url/${shortCode}`;const shortUrl = `http://localhost:${PORT}/api/url/${shortCode}`;
const User = require("../models/User.js");
const mongoose = require("mongoose");
const redisClient = require("../redis/redisClient.js");

async function createShortUrl(req, res) {
  const { longUrl, expiresAt, name } = req.body;
  const userId = req.user.id;

  if (!longUrl) {
    return res.status(400).json({
      error: "longUrl is required",
    });
  }

  try {
    const shortCode = Math.random().toString(36).substring(2, 8);

    const newUrl = await Url.create({
      shortCode,
      longUrl,
      user: userId,
      expiresAt,
      name,
    });

    //const shortUrl = `http://localhost:${PORT}/api/url/${shortCode}`;

    await User.findByIdAndUpdate(userId, { $push: { urls: newUrl._id } });

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
  const { shortCode } = req.params;

  try {
    //check cache
    const cachedLongUrl = await redisClient.get(shortCode);

    if (cachedLongUrl) {
      console.log(cachedLongUrl)
      return res.redirect(cachedLongUrl);
    }

    let url = await Url.findOne({ shortCode: shortCode });

    if (!url) {
      return res.status(404).json({
        error: "no such link was shortened",
      });
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({
        error: "Link has expired",
      });
    }

    //populate cache using fire and forget method. send db update without making user wait for it
    url.clicks.push({ timestamp: new Date() });
    url.save();

    redisClient.set(shortCode, url.longUrl, {EX: 3600});

    return res.redirect(url.longUrl);
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      error: "Server error occurred",
    });
  }
}

async function deleteUrl(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const url = await Url.findById(id);

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    if (url.user.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this URL" });
    }

    // delete from cache
    await redisClient.del(url.shortCode);

    await Url.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { urls: id } });

    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getUserUrls(req, res) {
  const userId = req.user.id;
  try {
    // 👇 We add 'select' to control the fields returned.
    // The virtual 'clickCount' will be included automatically.
    const user = await User.findById(userId).populate({
      path: "urls",
      select: "name longUrl shortCode expiresAt createdAt clickCount",
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.urls);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAnalytics(req, res) {
  const userId = req.user.id;
  try {
    const userUrls = await Url.find({ user: userId });

    const totalLinks = userUrls.length;
    // 👇 Calculate total clicks by summing the length of the clicks array
    const totalClicks = userUrls.reduce(
      (sum, url) => sum + url.clicks.length,
      0
    );

    // --- Chart Data Logic ---
    const clicksByDay = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      clicksByDay[dateString] = { date: dateString, clicks: 0 };
    }

    userUrls.forEach((url) => {
      url.clicks.forEach((click) => {
        const clickDate = new Date(click.timestamp);
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);

        if (clickDate >= sevenDaysAgo) {
          const dateString = clickDate.toISOString().split("T")[0];
          if (clicksByDay[dateString]) {
            clicksByDay[dateString].clicks++;
          }
        }
      });
    });

    const chartData = Object.values(clicksByDay).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    // --- End Chart Data Logic ---

    const analytics = {
      totalLinks,
      totalClicks,
      chartData,
    };

    res.status(200).json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching analytics" });
  }
}

// New function for public link creation
async function createPublicShortUrl(req, res) {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "longUrl is required" });
  }

  try {
    const shortCode = Math.random().toString(36).substring(2, 8);

    // Set expiration date to 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const newUrl = await Url.create({
      longUrl,
      shortCode,
      expiresAt,
      // No user is associated with this link
    });

    return res.status(201).json({ shortCode: newUrl.shortCode });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Server error occurred" });
  }
}

module.exports = {
  createShortUrl,
  getLongUrl,
  deleteUrl,
  getUserUrls,
  getAnalytics,
  createPublicShortUrl,
};
