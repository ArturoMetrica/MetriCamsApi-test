const router = require('express').Router();
const Controller = require('../controllers/mdvr.controller');
const Middleware = require('../middlewares/mdvr.middleware');
const Token = require('../middlewares/token.middleware');

router.post('/api/mdvr/login', Token.verify, Middleware.login, Controller.login);
router.get('/api/mdvr/offset', Token.verify, Middleware.getMdvrOffset, Controller.getMdvrOffset);
router.post('/api/mdvr/last-position', Token.verify, Middleware.getLastPosition, Controller.getLastPosition);


module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/