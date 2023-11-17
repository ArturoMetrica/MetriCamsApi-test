const router = require('express').Router();

const LogMiddleware = require('../middlewares/log.middleware');
const LogController = require('../controllers/log.controller');

router.post('/api/navigation', LogMiddleware.saveNavigationLog, LogController.saveNavigationLog);
router.post('/api/error', LogMiddleware.errorLog, LogController.errorLog);

module.exports = router