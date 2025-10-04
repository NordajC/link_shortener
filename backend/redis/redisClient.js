const redis = require('redis');
const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

(async () => {
    try {
        await redisClient.connect();
        console.log('Redis connected successfully.');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();

module.exports = redisClient;