const mongoose = require('mongoose');

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || 'AutoMechDB';
const url = `mongodb://${dbHost}:${dbPort}/${dbName}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection successful');
        mongoose.connection.close(); // Close connection after success
    })
    .catch(err => {
        console.error('Database connection error', err);
    });