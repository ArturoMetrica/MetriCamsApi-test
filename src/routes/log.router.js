const router = require('express').Router();

const LogMiddleware = require('../middlewares/log.middleware');
const LogController = require('../controllers/log.controller');
const TokenMiddleware = require('../middlewares/token.middleware');

router.post('/api/navigation', LogMiddleware.saveNavigationLog, LogController.saveNavigationLog);
router.post('/api/error', LogMiddleware.errorLog, LogController.errorLog);
router.post('/api/log/exceptions', TokenMiddleware.verify, LogMiddleware.exceptionsLog, LogController.exceptionsLog);
router.get('/api/log/exceptions', TokenMiddleware.verify, LogMiddleware.getExceptionsLog, LogController.getExceptionsLog);

module.exports = router