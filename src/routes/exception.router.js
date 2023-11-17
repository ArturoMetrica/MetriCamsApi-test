const router = require('express').Router();
const Middleware = require('../middlewares/exception.middleware');
const Controller = require('../controllers/exception.controller');

router.post('/api/alarms/count', Middleware.getAttendedAlarmsCount, Controller.getAttendedAlarmsCount);

module.exports = router;