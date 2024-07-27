const express = require('express');
const flightController = require('../controllers/flightController')

const router = express.Router();
router.post('/addFlightData', flightController.addFlightData);
router.get('/getFlightData', flightController.getFlightData)
module.exports = router;