require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dbClient = require('./config/db');
const injectRoutes = require('./routes/index');

const app = express();

app.use(express.json()) // Parse JSON bodies from request to be use in code to a javascript object
app.use(express.urlencoded({ extended: true })); // Parse url-encoded;
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,  // Allow credentials like cookies
}));

app.use('/api', injectRoutes());

module.exports = app;