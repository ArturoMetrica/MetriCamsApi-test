const routes = require('express').Router();
const baseRouter = require('express').Router();

const DriverDatasetController = require('../controllers/driverDataset.controller');
const DriverDatasetMiddleware = require('../middlewares/driverDataset.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');

routes.get('/driver/dataset', TokenMiddleware.verify, DriverDatasetController.getDriverDataset);
routes.put('/driver/dataset', TokenMiddleware.verify, DriverDatasetMiddleware.updateDriverDataset, DriverDatasetController.updateDriverDataset);

baseRouter.use('/api', routes);

module.exports = baseRouter;