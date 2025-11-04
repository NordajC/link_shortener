// backend/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Configure the rate limiter
const limiter = rateLimit({
  // Max 100 requests per 15 minutes per IP
  windowMs: 15 * 60 * 1000,
  max: 100,
  // Use Redis as the store
  // store: new RedisStore({ client: redisClient }),
  // Message to send when the limit is exceeded
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Configure the speed limiter (optional but recommended)
const speedLimiter = slowDown({
  // After 50 requests in 15 minutes, start adding a 500ms delay
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500,
  // store: new RedisStore({ client: redisClient }),
});

module.exports = { limiter, speedLimiter };