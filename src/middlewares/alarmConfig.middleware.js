'use strict'
const AlarmConfigValidator = require('../validators/alarmConfig.validator')
class AlarmConfigMiddleware {
	async get(req, res, next) {
		try {
			req.AlarmConfig = await AlarmConfigValidator.get().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			res.status(400).send('Los parámetros proporcionados no son correctos')
		}
	}

	async create(req, res, next) {
		try {
			req.AlarmConfig = await AlarmConfigValidator.create().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			res.status(400).send('Los parámetros proporcionados no son correctos')
		}
	}

	async update(req, res, next) {
		try {
			req.AlarmConfig = await AlarmConfigValidator.update().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			res.status(400).send('Los parámetros proporcionados no son correctos')
		}
	}

	async delete(req, res, next) {
		try {
			req.AlarmConfig = await AlarmConfigValidator.delete().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			res.status(400).send('Los parámetros proporcionados no son correctos')
		}
	}
}

module.exports = new AlarmConfigMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/