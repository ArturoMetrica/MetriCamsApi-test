const router = require('express').Router();

const Controller = require('../controllers/status.controller');

router.get('/api/status', Controller.status);
router.get('/api/connection/kill', Controller.killConnections);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/