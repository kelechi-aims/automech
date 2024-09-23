const redis = require('redis');


// Create a Redis client
const redisClient = async () => {
    const client = redis.createClient({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        db: process.env.REDIS_DB || 0, // Specify the database to use or use default
    });

    // Connect to the Redis server
    await client.connect();
   
    // Listen for successful Redis connection
    client.on('connect', () => {
        console.log('Connected to Redis');
    });


    // Display any errors
    client.on('error', (err) => {
        console.error('Redis error:', err);
    });

    return client;
};

module.exports = redisClient;