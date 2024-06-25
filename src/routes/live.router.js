const router = require('express').Router();
const LiveMiddleware = require('../middlewares/live.middleware');
const LiveController = require('../controllers/live.controller');
const tokenMiddleware = require('../middlewares/token.middleware');


router.get('/api/live/link/:config', LiveMiddleware.getLiveLink, LiveController.getLiveLink);
router.get('/api/live/video/config', tokenMiddleware.verify, LiveController.getLiveVideoConfig);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/