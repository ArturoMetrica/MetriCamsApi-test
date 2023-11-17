const router = require("express").Router();

const { baseLimit } = require('../middlewares/rateLimit.middleware');
const SecurityMiddleware = require('../middlewares/security.middleware');
const ErrorMiddlware = require('../middlewares/error.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');
const hasSessionId = require('../middlewares/sessionId.middleware');

router.use(
  baseLimit(),
  require('./status.router'),
  require('./language.router'),
  SecurityMiddleware.verifyApiKey,
  require('./video-download.router'),
  require('./urlClient.router'),
  require('./functions'),
  require('./auth.router'),
  require('./apiConnector.router'),
  require('./user.router'),
  hasSessionId,
  require('./views'),
  require('./streamax'),
  require('./template.router'),
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
  TokenMiddleware.verify,
  require('./group.router'),
  require('./diagnosticAlarm.router'),
  require('./exception.router'),
  require('./humanFactor.router'),
  ErrorMiddlware.handleNotFound,
  ErrorMiddlware.handleError,
);

module.exports = router;