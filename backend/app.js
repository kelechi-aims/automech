const express = require('express');
const injectRoutes = require('./routes/index.js');

const app = express();

app.use(express.json()); // Parse JSON bodies from request to be use in code to a javascript object
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/api', injectRoutes());
app.use(express.static('views'));

module.exports = app;
