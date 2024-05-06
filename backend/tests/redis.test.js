const RedisClient = require('../config/redis.js');

describe('RedisClient', () => {
    let redisClient;

    beforeAll(() => {
        // Create a new instance of RedisClient before running tests
        redisClient = new RedisClient();
    });

    afterEach(async () => {
        // Clear Redis keys after each test
        await redisClient.del('testKey');
    });

    afterAll(() => {
        // Close the Redis connection after all tests are done
        // redisClient.client.quit();
    });

    it('should set and get a value from Redis', async () => {
        const key = 'testKey';
        const value = 'testValue';

        // Set a value in Redis
        await redisClient.set(key, value, 10);

        // Get the value from Redis
        const retrievedValue = await redisClient.get(key);

        expect(retrievedValue).toEqual(value);    
    });

    it('should store and retrieve session data from Redis', async () => {
        const sessionId = 'sessionId';
        const userData = { name: 'John Doe', email: 'john@example.com' };

        // Store session data in Redis
        await redisClient.storeSessionData(sessionId, userData, 10);

        // Retrieve session data from Redis
        const retrievedData = await redisClient.getSessionData(sessionId);

        expect(retrievedData).toEqual(userData);
    });

    it('should handle rate limiting', async () => {
          const key = 'rateLimitKey';
          const limit = 1;
          const durationInSeconds = 1;

          await redisClient.rateLimit(key, limit, durationInSeconds);

          await expect(redisClient.rateLimit(key, limit, durationInSeconds)).rejects.toThrow('Rate limit exceeded');
        
    });

});