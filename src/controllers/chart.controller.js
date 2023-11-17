const ChartService = require('../services/chart.service')

const DBService = require('../services/database');
const DbService = new DBService();

class ChartController {
	async get(req, res, next) {
		try {
			const data = await ChartService.get(req.alarms)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/alarms/chart');

			res
				.status(400)
				.json({ error: { message: error.message || 'Bad request' } })
		}
	}

	async simChart(req, res, next) {
		try {
			res.status(200).json({ ok: true, data: [] })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/sims/chart');

			res
				.status(400)
				.json({ error: { message: error.message || 'Bad request' } })
		}
	}
}

module.exports = new ChartController()

/********************* Propiedad de Métrica Móvil SA de CV **************************/