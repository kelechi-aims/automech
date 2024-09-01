const mongoose = require('mongoose');

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'AutoMechDB';
const url = `mongodb://${dbHost}:${dbPort}/${dbName}`;

class DBClient {
    constructor() {
        mongoose.connect(url)
           .then(() => {
               console.log('Connected to MongoDB');
           })
           .catch(err => {
               console.error('Error connecting to MongoDB', err);
           });
    }

    closeConnection() {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

const dbClient = new DBClient();
module.exports = dbClient;