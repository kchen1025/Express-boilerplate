const express = require('express');
const disasterController = require('../controllers/disasterController.js');

const routes = () => {
    const disasterRouter = express.Router();

    disasterRouter
    .route('/disaster/:limit')
    .get(
        disasterController.getDisasterAlerts().validation,
        disasterController.getDisasterAlerts().getAlertsByLimit
    );

    return disasterRouter;
}

module.exports = routes;


