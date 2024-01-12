const routes = require('express').Router();
const baseRouter = require('express').Router();

const VehicleController = require('../controllers/vehicle.controller');
const VehicleMiddleware = require('../middlewares/vehicle.middleware');

routes.post('/vehicle', VehicleMiddleware.addVehicle, VehicleController.addVehicle);

baseRouter.use('/api', routes);

module.exports = baseRouter;