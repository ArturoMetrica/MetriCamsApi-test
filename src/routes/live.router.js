const router = require('express').Router();
const LiveMiddleware = require('../middlewares/live.middleware');
const LiveController = require('../controllers/live.controller');

router.get('/api/live/link/:config', LiveMiddleware.getLiveLink, LiveController.getLiveLink);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/