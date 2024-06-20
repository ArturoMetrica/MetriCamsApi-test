const routes = require('express').Router();
const baseRouter = require('express').Router();

const StreamaxController = require('../controllers/streamax.controller');
const StreamaxMiddleware = require('../middlewares/streamax.middleware');

routes.post('/rule', StreamaxMiddleware.addRule, StreamaxController.addRule);
routes.put('/rule', StreamaxMiddleware.updateRule, StreamaxController.updateRule);
routes.delete('/rule', StreamaxMiddleware.deleteRule, StreamaxController.deleteRule);

baseRouter.use('/api', routes);

module.exports = baseRouter;