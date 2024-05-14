const redisClient = require('../config/redis');

// Test suite for RedisClient
describe('RedisClient', () => {
    let client;

    beforeAll(async () => {
        // Create a new instance of RedisClient before running tests
        client = await redisClient();
    });

    afterEach(async () => {
        // Clear Redis keys after each test
        await client.del('testKey');
    });

    afterAll(() => {
        // Close the Redis connection after all tests are done
        client.quit();
    });

    it('should set and get a value from Redis', async () => {
        const key = 'testKey';
        const value = 'testValue';

        // Set a value in Redis
        await client.set(key, value);

        // Get the value from Redis
        const retrievedValue = await client.get(key);

        expect(retrievedValue).toEqual(value);    
    });    
});