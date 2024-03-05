const routes = require('express').Router();
const baseRouter = require('express').Router();

const shorcutController = require('../controllers/shortcut.controller');

routes.get('/shorcut', shorcutController.shorcutStructure);

baseRouter.use('/api', routes);

module.exports = baseRouter;