const router = require('express').Router();
const Middleware = require('../middlewares/vehicles.middleware');
const Validator = require('../validators/vehicles.validator');
const Controller = require('../controllers/vehicles.controller');

router.use(Middleware.sessionid);
router.get('/api/vehicles/groups', Middleware.getGroups, Controller.getGroups);
router.get('/api/vehicles', Controller.get);
router.get('/api/vehicles/camera-types', Controller.getCameraTypes);
router.post('/api/vehicles', Middleware.middleware(Validator.create), Controller.create);
router.put('/api/vehicles', Middleware.middleware(Validator.update), Controller.update);
router.delete('/api/vehicles', Middleware.middleware(Validator.delete), Controller.delete);
router.put('/api/vehicles/camera-access', Middleware.deleteCameraAccess, Controller.deleteCameraAccess);

router.get('/api/component/vehicles', Middleware.getComponentVehicle, Controller.getComponentVehicle);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/