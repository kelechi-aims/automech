const express = require('express');
const authController = require('../controllers/authController');

const injectRoutes = () => {
    const router = express.Router();

    router.post('/mechanics', authController.signupMechanic);
    router.post('/mechanic', authController.loginMechanic);

    return router;
}

module.exports = injectRoutes;