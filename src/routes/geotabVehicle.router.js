const router = require('express').Router();
const Controller = require('../controllers/geotabVehicle.controller');
const Middleware = require('../middlewares/geotabVehicle.middleware');

router.get('/api/vehicles/geotab', Middleware.getVehicles, Controller.getVehicles);

module.exports = router;