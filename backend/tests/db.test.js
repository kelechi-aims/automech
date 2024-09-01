const mongoose = require('mongoose');
const dbClient = require('../src/config/db');

describe('MongoDB Connection', () => {
    it('should connect to MongoDB', (done) => {
        const db = mongoose.connection;
        db.on('connected', () => {
            expect(db.readyState).toBe(1);
            done();
        });
    });

    afterAll((done) => {
        dbClient.closeConnection();
        done();
    });
});