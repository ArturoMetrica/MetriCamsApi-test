const express = require('express');

const Controller = require('../controllers/diagnosticAlarm.controller');
const Middleware = require('../middlewares/diagnosticAlarm.middleware');

const routes = express();

routes.get('/api/diagnostic/alarm-name', Controller.getDiagnosticAlarmName);
routes.post('/api/diagnostic/alarm', Middleware.getDiagnosticAlarm, Controller.getDiagnosticAlarm);

module.exports = routes;