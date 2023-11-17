const router = require('express').Router();
const Controller = require('../controllers/limit.controller');
const Middleware = require('../middlewares/limit.middleware');

router.post('/api/limit/historical', Middleware.insertDataUsage, Controller.historicalDataUsage);
router.put('/api/limit/historical', Middleware.getLimitArr, Controller.getHistoricalLimitArr);
router.post('/api/limit/live', Middleware.insertDataUsage, Controller.liveDataUsage);
router.put('/api/limit/live', Middleware.getLimitArr, Controller.getLiveLimitArr);

router.post('/api/limit/config', Middleware.configDataUsage, Controller.configDataUsage);
router.get('/api/limit/config', Middleware.getConfigDataUsage, Controller.getConfigDataUsage);

module.exports = router;