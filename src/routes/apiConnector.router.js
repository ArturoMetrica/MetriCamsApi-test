const router = require('express').Router();
const Controller = require('../controllers/mdvr.controller');
const cController = require('../controllers/vehicle.controller');
const eController = require('../controllers/evidence.controller');
const eMiddleware = require('../middlewares/evidence.middleware');

router.get('/api/mdvr', Controller.getMdvrPerClient);
router.get('/api/cameras', cController.getCamerasVehiclesForEvidence);
router.post('/api/evidence', eMiddleware.getEvidenceLink, eController.getEvidenceLink);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/