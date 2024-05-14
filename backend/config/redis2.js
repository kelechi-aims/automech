const redis = require('redis');


// Create a Redis client
const redisClient = async () => {
    const client = redis.createClient({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
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

    const reply = await client.set('hello', 'world');
    console.log(reply); // OK

    const keyValue = await client.get('hello');
    console.log(keyValue); // world

    // Clean up and allow the script to exit.
    client.quit();
};

const main = async () => {
    try {
        await redisClient();
    } catch (error) {
        console.error(error);
    }
};

main()