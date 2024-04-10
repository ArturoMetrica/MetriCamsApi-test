const router = require('express').Router();

const Controller = require('../controllers/status.controller');
const Middleware = require('../middlewares/status.middleware');

router.get('/api/status', Controller.status);
router.get('/api/connection/kill', Controller.killConnections);
router.put('/api/alarm-status', Middleware.getAlarmStatusByDate, Controller.getAlarmStatusByDate);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/