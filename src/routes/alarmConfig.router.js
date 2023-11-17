'use strict'
const router = require('express').Router()
const AlarmConfigController = require('../controllers/alarmConfig.controller')
const AlarmConfigMiddleware = require('../middlewares/alarmConfig.middleware')

router.get(
	'/api/alarms/config',
	AlarmConfigMiddleware.get,
	AlarmConfigController.get
)
router.post(
	'/api/alarms/config',
	AlarmConfigMiddleware.create,
	AlarmConfigController.create
)
router.put(
	'/api/alarms/config',
	AlarmConfigMiddleware.update,
	AlarmConfigController.update
)
router.delete(
	'/api/alarms/config',
	AlarmConfigMiddleware.delete,
	AlarmConfigController.delete
)

module.exports = router

/********************* Propiedad de Métrica Móvil SA de CV **************************/