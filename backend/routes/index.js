const express = require('express');
const mechanicController = require('../controllers/mechanicController');  

const router = express.Router();

router.get('/mechanics', mechanicController.signupMechanic);

module.exports = router;