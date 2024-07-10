const routes = require('express').Router();
const baseRouter = require('express').Router();

const historicalController = require('../controllers/historical.controller');
const historicalMiddleware = require('../middlewares/historical.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');

routes.post('/historical', TokenMiddleware.verify, historicalMiddleware.historyStreamingVideo, historicalController.historyStreamingVideo);
routes.post('/historical/stop', TokenMiddleware.verify, historicalMiddleware.stopDeviceStreaming, historicalController.stopDeviceStreaming);

baseRouter.use('/api', routes);

module.exports = baseRouter;