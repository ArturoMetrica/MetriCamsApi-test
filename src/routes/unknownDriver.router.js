const router = require('express').Router();
const { Router } = require('express');
const Controller = require('../controllers/unknownDriver.controller');
const Middleware = require('../middlewares/unknownDriver.middleware');

router.put('/api/alarms/unknown-driver', Middleware.getAlarmsUnknownDriver, Controller.getAlarmsUnknownDriver);

module.exports = router;
