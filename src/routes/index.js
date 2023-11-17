const express = require('express');

const app = express();
const hasApiKey = require('../middlewares/security.middleware');
const sessionIdMiddleware = require('../middlewares/sessionId.middleware');
const { verify: verifyToken } = require('../middlewares/token.middleware');

app.use(
  require('./status.router'), 
  require('./language.router'),
  hasApiKey,
  require('./video-download.router'),
  require('./urlClient.router'),
  require('./functions'),
  require('./auth.router'),
  require('./apiConnector.router'),
  require('./user.router'),
  sessionIdMiddleware,
  require('./views'),
  require('./streamax'),
  require('./template.router'),
  require('./chart.router'),
  require('./alarmConfig.router'),
  require('./report.router'),
  require('./driver.router'),
  require('./codeGroup.router'),
  require('./vehicle.router'),
  require('./FT_API.router'),
  require('./commands.router'),
  require('./geotabRule.router'),
  require('./mdvr.router'),
  require('./rol.router'),
  require('./facialRecognition.router'),
  require('./geotabDriver.router'),
  require('./geotabVehicle.router'),
  require('./dashboardStatistics.router'),
  require('./geotabZone.router'),
  require('./log.router'),
  require('./alarmTask.router'),
  require('./evidence.router'),
  require('./classificationMessage.router'),
  require('./watchDog.router'),
  require('./videoCalendar.router'),
  require('./unknownDriver.router'),
  require('./limit.router'),
  require('./catalogue.router'),
  require('./surfsight.router'),
  verifyToken,
  require('./group.router'),
  require('./diagnosticAlarm.router'),
  require('./exception.router'),
  require('./humanFactor.router'),
  (err, req, res, next) => {
    if (typeof err.code !== 'number') err.code = 400;
    res.status(err.code || 400).send({
      ok: false,
      code: err.code,
      message: err.message || 'Bad request',
      errorCode: err.errorCode || err.code || 400
    });
  }
);

module.exports = app;

/********************* Propiedad de Métrica Móvil SA de CV **************************/