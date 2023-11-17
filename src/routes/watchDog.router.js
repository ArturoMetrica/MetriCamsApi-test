const router = require('express').Router();

const Controller = require('../controllers/watchDog.controller');
const Middleware = require('../middlewares/watchDog.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');

router.post('/api/watchDog', TokenMiddleware.verify, Middleware.getVehiclesData, Controller.getVehiclesData);


module.exports = router;