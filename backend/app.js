const express = require('express');
//const routes = require('./routes/index.js');

const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
//app.use(routes);

module.exports = app;