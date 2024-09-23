const express = require('express');
const authController = require('../controllers/authController');

const injectRoutes = () => {
    const router = express.Router();

    router.post('/mechanics', authController.signupMechanic);
    router.post('/login', authController.login);

    router.post('/customers', authController.signupCustomer);

    router.get('/auth/google/mechanic', (req, res, next) => {
        req.query.role = 'mechanic';
        authController.
    } authController.googleAuthMech);
    router.get('/auth/google/callback', authController.googleCallbackMech);

    return router;
}

module.exports = injectRoutes;