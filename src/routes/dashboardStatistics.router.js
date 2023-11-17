const router = require('express').Router();

const Controller = require('../controllers/dashboardStatistics.controller');
const Middleware = require('../middlewares/dashboardStatistics.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');

router.get('/api/dashboard-statistics', TokenMiddleware.verify, Middleware.getStatistics, Controller.getStatistics);

router.get('/api/zoom-drivers', TokenMiddleware.verify, Middleware.getZoomAlerts, Controller.getZoomAlerts);

module.exports = router;