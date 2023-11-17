const router = require('express').Router()
const DriverController = require('../controllers/driver.controller.js')
const DriverMiddleware = require('../middlewares/driver.middleware.js')

router.get(
	'/api/geotab/drivers',
	DriverMiddleware.geotabGet,
	DriverController.geotabGet
)

router.get(
	'/api/faces',
	DriverMiddleware.getFTAPIFaces,
	DriverController.getFTAPIFaces
)

module.exports = router

/********************* Propiedad de Métrica Móvil SA de CV **************************/