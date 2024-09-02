const dataUsageService = require('../services/dataUsage.service');

class DataUsageController {
	async getDataUsage(req, res) {
		try {
			const { sessionid } = req.sessionid;
			const { offset } = req.data;

			const { data, message } = await dataUsageService.getDataUsage(sessionid, offset);
			res.status(200).json({
				status: true,
				message,
				data
			});
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/data/usage');

			res.status(500).json({
				status: false,
				message: error.message || error,
				data: null
			});
		}
	}

}

module.exports = new DataUsageController();