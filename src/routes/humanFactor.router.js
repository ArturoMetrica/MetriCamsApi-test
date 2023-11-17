const routes = require('express').Router();
const baseRouter = require('express').Router();

const HumanFactorController = require('../controllers/humanFactor.controller');
const HumanFactorMiddleware = require('../middlewares/humanFactor.middleware');

routes.put('/risk-analytics', HumanFactorMiddleware.getRiskAnalytics, HumanFactorController.getRiskAnalytics);
routes.put('/incident-detail', HumanFactorMiddleware.getIncidentDetail, HumanFactorController.getIncidentDetail);

baseRouter.use('/api/human-factor', routes);

module.exports = baseRouter;
