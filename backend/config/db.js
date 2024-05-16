const mongoose = require('mongoose');


const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'AutoMechDB';

const url = `mongodb://${dbHost}:${dbPort}/${dbName}`;

class DBClient {
    constructor() {
        mongoose.connect(url);
        
    }

    closeConnection() {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
    }

    /**
     * 
     * @returns number of documents in the collection meachanic
     */
    async nbMechanics() {
        return
    }
}

const dbClient = new DBClient();
module.exports = dbClient;