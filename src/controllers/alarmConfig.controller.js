'use strict'
const AlarmConfigService = require('../services/alarmConfig.service.js')

const DBService = require('../services/database');
const DbService = new DBService();

class AlarmConfigController {
	async get(req, res, next) {
		try {
			const data = await AlarmConfigService.get(req.AlarmConfig)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/alarms/config');
			res.status(400).json({ error: error.message })
		}
	}

	async create(req, res, next) {
		try {
			const data = await AlarmConfigService.create(req.AlarmConfig)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/alarms/config');
			res.status(400).json({ error: error.message })
		}
	}

	async update(req, res, next) {
		try {
			const data = await AlarmConfigService.update(req.AlarmConfig)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/alarms/config');
			res.status(400).json({ error: error.message })
		}
	}

	async delete(req, res, next) {
		try {
			const data = await AlarmConfigService.delete(req.AlarmConfig)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/alarms/config');
			res.status(400).json({ error: error.message })
		}
	}
}

module.exports = new AlarmConfigController()

/********************* Propiedad de Métrica Móvil SA de CV **************************/