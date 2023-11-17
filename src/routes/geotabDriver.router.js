const router = require('express').Router();
const Controller = require('../controllers/geotabDriver.controller');
const Middleware = require('../middlewares/geotabDriver.middleware');

router.get('/api/geotab/driver', Middleware.getDriver, Controller.getDriver);
router.get('/api/geotab/driversList', Controller.getDriverList);

module.exports = router;

