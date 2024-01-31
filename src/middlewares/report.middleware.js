const ReportsValidator = require('../validators/report.validator')

class ReportsMiddleware {
	async get(req, res, next) {
		try {
			req.report = await ReportsValidator.get().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async getTimezones(req, res, next) {
		try {
			req.timezones = await ReportsValidator.getTimezones().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async getVisibility(req, res, next) {
		try {
			req.report = await ReportsValidator.getVisibility().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async create(req, res, next) {
		try {
			req.report = await ReportsValidator.create().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async update(req, res, next) {
		try {
			req.report = await ReportsValidator.update().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async delete(req, res, next) {
		try {
			req.report = await ReportsValidator.delete().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	getAdvancedReport = async (req, res, next) => {
		try {
			req.report = await ReportsValidator.getAdvancedReport().validateAsync({
				...req.body
			});
	
			next();
		} catch (error) {
			res.status(400).json({ status: false, message: error.message || error, data: null });
		}
	}

	deleteExcel = async (req, res, next) => {
		try {
			req.report = await ReportsValidator.deleteExcel().validateAsync({
				...req.query,
				...req.params
			});

			next ();
		} catch (error) {
			res.status(400).json({ status: false, message: error.message || error, data:null });
		}
	}
	
}

module.exports = new ReportsMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/