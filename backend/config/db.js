const mongoose = require('mongoose');
const Mechanic = require('../models/mechanic');

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

    // Get mechanic by email
    async  getMechanicByEmail(email) {
        if (!email) {
            console.log('no email passed');
        }
        try {
            const mechanic = await Mechanic.findOne({ email: email });
            return mechanic;
        } catch (err) {
            console.error('Error getting mechanic by email', err);
        }   
    }

    closeConnection() {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

const dbClient = new DBClient();
module.exports = dbClient;
