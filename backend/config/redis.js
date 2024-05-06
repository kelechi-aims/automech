const redis = require('redis');
//const bluebird = require('bluebird');
const { promisify } = require('util');

//bluebird.promisifyAll(redis);


class RedisClient {
    constructor(options = {}) {
        this.client = redis.createClient({
            host: options.host || 'localhost',
            port: options.port || 6379,
        });

        this.client.connected = true;
        // Log Redis connection status
        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });

        // Log Redis errors
        this.client.on('error', (error) => {
            console.error('Redis error:', error);    
        });
    }

    isAlive() {
        return this.client.connected;
    }
    // Retrieve data from Redis cache
    async get(key) {
        const getAsync = promisify(this.client.get).bind(this.client);
        return getAsync(key);
    }

    // Cache data in Redis
    async set(key, value, durationInSeconds) {
        const setAsync = promisify(this.client.set).bind(this.client);
        await setAsync(key, value, 'EX', durationInSeconds);
    }

    // Delete data from Redis
    async del(key) {
        const delAsync = promisify(this.client.del).bind(this.client);
        await delAsync(key);
    }

    // Store Session data in Redis
    async storeSessionData(sessionId, userData, durationInSeconds) {
        const hmsetAsync = promisify(this.client.hmset).bind(this.client);
        const expireAsync = promisify(this.client.expire).bind(this.client);

        await hmsetAsync(sessionId, userData);
        await expireAsync(sessionId, durationInSeconds);
    }

    // Get session data from Redis
    async getSessionData(sessionId) {
        const hgetallAsync = promisify(this.client.hgetall).bind(this.client);   
        return await hgetallAsync(sessionId);
    }

    //Public message to Redis channel
    async publishMessage(channel, message) {
        const publishAsync = promisify(this.client.publish).bind(this.client);
        await publishAsync(channel, message);
    }

    // Subcribe to Redis channel and handle incoming messages
    async subcribeToChannel(channel, messageHandler) {
        const subcriber = redis.createClient();
        const subcribeAsync = promisify(subcriber.subcribe).bind(subcriber);
        await subcribeAsync(channel);
        subcriber.on('message', messageHandler);
    }

    // Implement rate limiting using Redis
    async rateLimit(key, limit, durationInSeconds) {
        const currentTime = Date.now();
        const getAsync = promisify(this.client.get).bind(this.client);
        const setAsync = promisify(this.client.set).bind(this.client);

        const keyTimestamp = await getAsync(key);

        if (!keyTimestamp) {
            await setAsync(key, currentTime, 'Ex', durationInSeconds);
        } else {
            const timeDifference = currentTime - parseInt(keyTimestamp);
            if (timeDifference < durationInSeconds * 1000) {
                throw new Error('Rate limit exceeded');
            } else {
                await setAsync(key, currentTime, 'Ex', durationInSeconds);
            }
        }
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;