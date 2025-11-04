const Url = require("../models/Urls.js");
require("dotenv").config(); // Loads variables from .env fileconst shortUrl = `http://localhost:${PORT}/api/url/${shortCode}`;const shortUrl = `http://localhost:${PORT}/api/url/${shortCode}`;
const User = require("../models/User.js");
const mongoose = require("mongoose");
const redisClient = require("../redis/redisClient.js");
const logger = require("../config/logger.js");

const urlLogger = logger.child({
  service: "url-controller",
});

async function createShortUrl(req, res) {
  const { longUrl, expiresAt, name } = req.body;

  if (!req.user || !req.user.id) {
    urlLogger.error({
      message: "createShortUrl called without authenticated user",
      ip: req.ip,
    });
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.id;

  if (!longUrl) {
    urlLogger.warn({
      message: "createShortUrl failed: longUrl is required.",
      ip: req.ip,
      userId: userId,
    });
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
      expiresAt: expiresAt || null,
      name,
    });

    //const shortUrl = `http://localhost:${PORT}/api/url/${shortCode}`;

    //adds url to user urls
    await User.findByIdAndUpdate(userId, { $push: { urls: newUrl._id } });

    // sucessful url creation logging
    urlLogger.info({
      message: "Short URL created successfully",
      userId: userId, // Include relevant context
      shortCode: newUrl.shortCode,
      longUrl: newUrl.longUrl,
    });

    return res.status(201).json({
      shortCode: shortCode,
    });
  } catch (e) {
    urlLogger.error({
      message: "Error creating short URL",
      error: e,
      userId: userId,
      longUrl: longUrl,
    });

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
      // Fire-and-forget click update in background (if needed for cached hits)
      // This is more complex, might involve a separate process or queue.
      // For simplicity now, we only update clicks on DB fetch.
      return res.redirect(cachedLongUrl);
    }

    // Cache miss, fetch from DB
    urlLogger.info({
      message: "Cache miss for shortCode",
      shortCode: shortCode,
    });
    let url = await Url.findOne({ shortCode: shortCode });

    //
    if (!url) {
      logger.urlLogger({
        message: "User tried to access non-existing short URL",
        ip: req.ip,
      });

      return res.status(404).json({
        error: "No such link was shortened",
      });
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      urlLogger.warn({
        message: "User tried to access expired URL",
        shortCode: shortCode,
        ip: req.ip,
        expiresAt: url.expiresAt,
        urlId: url._id,
      });

      return res.status(410).json({
        error: "Link has expired",
      });
    }

    // Populate cache with TTL
    await redisClient.set(shortCode, url.longUrl, { EX: 3600 }); // Set expiry for 1 hour
    urlLogger.info({
      message: "Populated cache for shortCode",
      shortCode: shortCode,
    });

    // Fire-and-forget click update
    url.clicks.push({ timestamp: new Date() });
    url.save().catch((err) => {
      // Add error handling for the background save
      urlLogger.error({
        message: "Background click save failed",
        shortCode: shortCode,
        urlId: url._id,
        error: err,
      });
    });

    return res.redirect(url.longUrl);
  } catch (e) {
    urlLogger.error({ message: "Error retrieving long URL.", error: e });

    return res.status(500).json({
      error: "Server error occurred",
    });
  }
}

async function deleteUrl(req, res) {
  const { id } = req.params;

  if (!req.user || !req.user.id) {
    urlLogger.error({
      message: "deleteUrl called without authenticated user",
      ip: req.ip,
    });
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.id;

  try {
    const url = await Url.findById(id);

    if (!url) {
      urlLogger.warn({
        message: "user tried to delete a non-exisiting URL",
        ip: req.ip,
      });
      return res.status(404).json({ error: "URL not found" });
    }

    if (url.user.toString() !== userId) {
      logger.urlLogger({
        message: "Unauthorized URL deletion attempt",
        ip: req.ip,
      });

      return res
        .status(403)
        .json({ error: "You are not authorized to delete this URL" });
    }

    // delete from cache
    await redisClient.del(url.shortCode);

    await Url.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { urls: id } });

    urlLogger.info({
      message: "URL deleted successfully",
      userId: userId,
      urlId: id,
    });
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    urlLogger.error({
      message: "Server error occurred. Could not delete URL.",
      error: error,
    });
    res.status(500).json({ error: "Server error" });
  }
}

async function getUserUrls(req, res) {
  if (!req.user || !req.user.id) {
    urlLogger.error({
      message: "getUserUrls called without authenticated user",
      ip: req.ip,
    });
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.id;
  try {
    // 👇 We add 'select' to control the fields returned.
    // The virtual 'clickCount' will be included automatically.
    const user = await User.findById(userId).populate({
      path: "urls",
      select: "name longUrl shortCode expiresAt createdAt clickCount",
    });
    if (!user) {
      urlLogger.warn({
        message: "User not found when fetching URLs",
        ip: req.ip,
      });
      return res.status(404).json({ error: "User not found" });
    }

    urlLogger.info({ message: "Fetched URLs for user", userId: userId });
    res.json(user.urls);
  } catch (error) {
    urlLogger.error({ message: "Server error occurred.", error: error });
    res.status(500).json({ error: "Server error" });
  }
}

async function getAnalytics(req, res) {
  if (!req.user || !req.user.id) {
    urlLogger.error({
      message: "getAnalytics called without authenticated user",
      ip: req.ip,
    });
    return res.status(401).json({ error: "Unauthorized" });
  }

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

    urlLogger.info({ message: "Fetched analytics for user", userId: userId });

    res.status(200).json(analytics);
  } catch (error) {
    urlLogger.error({ message: "Error fetching analytics.", error: error });
    res.status(500).json({ error: "Server error while fetching analytics" });
  }
}

// New function for public link creation
async function createPublicShortUrl(req, res) {
  const { longUrl } = req.body;

  if (!longUrl) {
    urlLogger.warn({
      message: "createPublicShortUrl failed: longUrl is required.",
      ip: req.ip,
    });
    return res.status(400).json({ error: "longUrl is required" });
  }

  try {
    urlLogger.info("Attempting to generate shortCode..."); // Log 1
    const shortCode = Math.random().toString(36).substring(2, 8);

    // Set expiration date to 7 days from now
    urlLogger.info("Attempting to generate expiresAt..."); // Log 1
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    urlLogger.info("Attempting to generate newUrl..."); // Log 1
    const newUrl = await Url.create({
      longUrl,
      shortCode,
      expiresAt: expiresAt, // Set to 7 days from now
      user: null // No user is associated with this link
    });
    urlLogger.info("shortcode created"); // Log 1

    
    if (!newUrl || !newUrl.shortCode) {
      urlLogger.error({
        message: "Failed to create public short URL: No shortCode returned",
        longUrl: longUrl,
      });
      return res.status(500).json({ error: "Failed to create short URL" });
    }

    urlLogger.info({
      message: "Public short URL created successfully",
      shortCode: newUrl.shortCode,
      longUrl: newUrl.longUrl,
    });
    return res.status(201).json({ shortCode: newUrl.shortCode });
  } catch (e) {
    console.error(">>> DEBUG: Entering createPublicShortUrl CATCH block <<<", e); // Add this line
    urlLogger.error({ message: "Error creating public short URL", error: e });
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
