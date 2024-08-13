const router = require('express').Router();
const baseRouter = require('express').Router();

const Controller = require('../controllers/user.controller');
const Middleware = require('../middlewares/user.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

router.get('/registeredusers', Middleware.getRegisteredUsers, Controller.getRegisteredUsers);
router.get('/user/complete-register', Middleware.completeRegister, Controller.completeRegister);
router.put('/user', Middleware.updateUser, Controller.updateUser);
router.delete('/user', Middleware.deleteUser, Controller.deleteUser);
router.post('/user/duration', Middleware.setUserDuration, Controller.setUserDuration);

//Modulos de usuario
router.get('/user/modules', tokenMiddleware.verify, Middleware.getListModulesUser, Controller.getListModulesUser)
router.put('/user/modules', tokenMiddleware.verify, Middleware.updateListModulesUser, Controller.updateListModulesUser)

baseRouter.use('/api', router);
module.exports = baseRouter;

/********************* Propiedad de Métrica Móvil SA de CV **************************/