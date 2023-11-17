const router = require('express').Router();
const Controller = require('../controllers/rol.controller');
const Middleware = require('../middlewares/rol.middleware');
const Token = require('../middlewares/token.middleware');

router.get('/api/securityroles', Token.verify, Controller.getRol);
router.post('/api/securityroles', Middleware.createRol, Controller.createRol);
router.put('/api/securityroles', Middleware.updateRol, Controller.updateRol);
router.delete('/api/securityroles', Middleware.deleteRol, Controller.deleteRol);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/