const redis = require('redis');
require('dotenv').config();// Load variables from .env file
const logger = require('../config/logger.js');
const redisLogger = logger.child({
  service: 'redis-client',
});

const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on('error', err => redisLogger.error({message: 'Redis Client Error', error: err}));

(async () => {
    try {
        await redisClient.connect();
        redisLogger.info({message: 'Connected to Redis successfully'});
    } catch (err) {
        redisLogger.error({message: 'Redis connection error', error: err});
    }
})();

module.exports = redisClient;