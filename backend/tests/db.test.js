const DBClient = require('../config/db');

describe('DbClient', () => {
    let dbClient;

    beforeAll(() => {
        
        dbClient = new DBClient();
    });

    test('Connects to the MongoDB database', () => {
        // Ensure that the dbClient object is created
        expect(dbClient).toBeDefined();
    });

    afterAll(() => {
        // Close the MongoDB connection after all tests
        if (dbClient) {
            dbClient.closeConnection();
        }
    });
});