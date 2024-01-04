const router = require('express').Router();

const Controller = require('../controllers/dashboardRiskAnalytics.controller');
const Middleware = require('../middlewares/dashboardRiskAnalytics.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');

router.get('/api/dashboard-analytics', TokenMiddleware.verify, Middleware.getVehiclesAndDriversByGroupsLevel, Controller.getVehiclesAndDriversByGroupsLevel);

module.exports = router;