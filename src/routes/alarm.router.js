const express = require('express');

const AlarmController = require('../controllers/alarm.controller');
const AlarmMiddleware = require('../middlewares/alarm.middleware');

const routes = express();

routes.get('/api/heat/map/alarm', AlarmMiddleware.getHeatMapAlarm, AlarmController.getHeatMapAlarm);
routes.post('/api/alarm/group', AlarmMiddleware.getAlarmsByGroup, AlarmController.getAlarmsByGroup);
routes.post('/api/alarm/driver', AlarmMiddleware.getAlarmsByDriver, AlarmController.getAlarmsByDriver);

module.exports = routes;