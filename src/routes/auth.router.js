const router = require('express').Router();
const baseRouter = require('express').Router();

const { authLimit } = require('../middlewares/rateLimit.middleware');

const Controller = require('../controllers/auth.controller');
const tokenController = require('../controllers/token.controller');
const Middleware = require('../middlewares/auth.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');
const LoginService = require('../services/login.service');

router.post('/login', authLimit(), LoginService, Middleware.login, Controller.login);
router.post('/sso', authLimit(), Middleware.ssoLogin, Controller.ssoLogin);
router.post('/login-connector', Middleware.loginConnector, Controller.loginConnector);
router.post('/check', tokenMiddleware.check, tokenController.check);
router.post('/user/quiz', tokenMiddleware.verify, Middleware.logUserQuiz, Controller.logUserQuiz);

baseRouter.use('/api', router);
module.exports = baseRouter;

/********************* Propiedad de Métrica Móvil SA de CV **************************/