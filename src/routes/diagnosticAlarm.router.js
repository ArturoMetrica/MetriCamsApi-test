const express = require('express');

const Controller = require('../controllers/diagnosticAlarm.controller');
const Middleware = require('../middlewares/diagnosticAlarm.middleware');

const routes = express();

routes.get('/api/diagnostic/alarm-name', Controller.getDiagnosticAlarmName);
routes.post('/api/diagnostic/alarm', Middleware.getDiagnosticAlarm, Controller.getDiagnosticAlarm);
routes.post('/api/diagnostic/device/alarm', Middleware.getDeviceHealthStartEndDatetime, Controller.getDeviceHealthStartEndDatetime);

module.exports = routes;