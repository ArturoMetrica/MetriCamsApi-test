const routes = require('express').Router();
const baseRouter = require('express').Router();

const snapController = require('../controllers/snap.controller');
const snapMiddleware = require('../middlewares/snap.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');

routes.get('/snaps/', snapMiddleware.getSnaps, snapController.getSnaps);
routes.get('/snaps/vehicles', snapController.getVehiclesWithSnaps);
routes.get('/snaps/dates', snapMiddleware.getSnapDates, snapController.getSnapDates);
routes.put('/snaps/data-usage', snapMiddleware.getDataUsage, snapController.getDataUsage);
routes.post('/snaps/last-snaps', snapMiddleware.getLastsSnapshots, snapController.getLastsSnapshots);

baseRouter.use('/api', routes);

module.exports = baseRouter;