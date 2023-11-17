const ChartValidator = require('../validators/chart.validator')
const GeotabRuleValidator = require('../validators/geotabRule.validator')

class ChartMiddleware {
	async getData(req, res, next) {
		try {
			req.chart = await ChartValidator.getData().validateAsync(req.query)
      next()
		} catch (error) {
      res.status(400).send('Los parámetros proporcionados no son correctos')
    }
	}

	async simChart(req, res, next) {
		try {
			req.chart = await ChartValidator.simChart().validateAsync(req.query)
      next()
		} catch (error) {
      res.status(400).send('Los parámetros proporcionados no son correctos')
    }
	}

	async getAlarmGeotabStreamax (req, res, next) {
		try {
				req.alarms = await GeotabRuleValidator.getAlarmGeotabStreamaxChart().validateAsync({
						...req.body,
						...req.headers,
				})
				next()
		} catch (error) {
				res.status(400).json({ status: false, message: error.message || error });
		}
}
}

module.exports = new ChartMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/