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

// // Rutas
// router.get('/snaps/', Middleware.getSnaps, Controller.getSnaps);
// router.get('/snaps/vehicles', Controller.getVehiclesWithSnaps);
// router.get('/snaps/dates', Middleware.getSnapDates, Controller.getSnapDates);
// router.put('/data-usage', Middleware.getDataUsage, Controller.getDataUsage);
// router.post('/last-snaps', Middleware.getLastsSnapshots, Controller.getLastsSnapshots);

// // Prefijo de las rutas
// app.use('/api/snaps', router);
// module.exports = app;