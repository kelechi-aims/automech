const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
    it('should return a message from the API', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Hello from Automech API');
    });
});