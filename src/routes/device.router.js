const routes = require('express').Router();
const baseRouter = require('express').Router();

const deviceController = require('../controllers/device.controller');
const deviceMiddleware = require('../middlewares/device.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');

routes.post('/device', TokenMiddleware.verify, deviceMiddleware.addDevice, deviceController.addDevice);
routes.put('/device', TokenMiddleware.verify, deviceMiddleware.updateDevice, deviceController.updateDevice);
routes.delete('/device', TokenMiddleware.verify, deviceMiddleware.deleteDevice, deviceController.deleteDevice);

baseRouter.use('/api', routes);

module.exports = baseRouter;