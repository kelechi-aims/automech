const mongoose = require('mongoose');


const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'AutoMechDB';

const url = `mongodb://${dbHost}:${dbPort}/${dbName}`;

class DbClient {
    constructor() {
        mongoose.connect(url);
        
    }

    closeConnection() {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}


module.exports = DbClient;