const routes = require('express').Router();
const baseRouter = require('express').Router();

const DeviceController = require('../controllers/device.controller');
const DeviceMiddleware = require('../middlewares/device.middleware');

routes.post('/device', DeviceMiddleware.addDevice, DeviceController.addDevice);

baseRouter.use('/api', routes);

module.exports = baseRouter;