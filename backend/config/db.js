const mongoose = require('mongoose');


const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.PORT || 27017;
const url = `mongodb://${DB_HOST}:${DB_PORT}/AutoMechDB`;

class DbClient {
    constructor() {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

        .then(() => console.log(`connected to mongodb on port ${DB_PORT}`))
        .catch((error) => console.error('Error connecting to mongodb', error))
    }
}


module.exports = DbClient;