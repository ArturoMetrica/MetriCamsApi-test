
const GeotabService = require('../services/geotab.service')
const FTAPIService = require('../services/FT_API.service');

const DBService = require('../services/database');
const DbService = new DBService();

class DriverController {

	async geotabGet(req, res, next) {
		try {
			const Geotab = new GeotabService(req.driver.geotab)
			const data = await Geotab.getUsers(req.driver)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/geotab/drivers');
			next(error)
		}
	}

	async getFTAPIFaces(req, res, next) {
		const { startTime, endTime, page, pageSize, uniqueIds } = req.query;
		const { token } = req.headers;
		try {
			const data = await FTAPIService.getComparisonResult(token, startTime, endTime, page, pageSize, uniqueIds);
			res.status(200).json({ ok: true, data });
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/faces');
			next(error);
		}
	}
}

module.exports = new DriverController()

/********************* Propiedad de Métrica Móvil SA de CV **************************/