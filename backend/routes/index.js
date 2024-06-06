const express = require('express');
const mechanicController = require('../controllers/mechanicController');
const AuthController = require('../controllers/authController');

const injectRoutes = () => {
    const router = express.Router();

    // Correcting the route path to match your request
    router.post('/signupMechanic', mechanicController.signupMechanic);
    router.post('/login', AuthController.login);
    
    return router;
};

module.exports = injectRoutes;
