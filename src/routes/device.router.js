const routes = require('express').Router();
const baseRouter = require('express').Router();

const deviceMiddleware = require('../middlewares/device.middleware');
const deviceController = require('../controllers/device.controller');

routes.post('/device', deviceMiddleware.addDevice, deviceController.addDevice);
routes.put('/device', deviceMiddleware.updateDevice, deviceController.updateDevice);
routes.delete('/device', deviceMiddleware.deleteDevice, deviceController.deleteDevice);

baseRouter.use('/api', routes);

module.exports = baseRouter;