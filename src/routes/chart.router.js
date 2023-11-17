const router = require('express').Router()
const ChartMiddleware = require('../middlewares/chart.middleware')
const ChartController = require('../controllers/chart.controller')

router.get('/api/alarms/chart', ChartMiddleware.getData, ChartController.get)
router.put('/api/alarms/chart', ChartMiddleware.getAlarmGeotabStreamax, ChartController.get)

router.get(
	'/api/sims/chart',
	ChartMiddleware.simChart,
	ChartController.simChart
)

module.exports = router

/********************* Propiedad de Métrica Móvil SA de CV **************************/