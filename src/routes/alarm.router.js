const express = require('express');

const AlarmController = require('../controllers/alarm.controller');
const AlarmMiddleware = require('../middlewares/alarm.middleware');

const routes = express();

routes.get('/api/heat/map/alarm', AlarmMiddleware.getHeatMapAlarm, AlarmController.getHeatMapAlarm);

module.exports = routes;