const alarmService = require('../services/alarm.service');

class AlarmController {
	async getHeatMapAlarm(req, res) {
		try {
			const { sessionid } = req.sessionid;
			const { fromDate, toDate } = req.alarm;

			const data = await alarmService.getHeatMapAlarm(sessionid, fromDate, toDate);
			res.status(200).json({
				status: true,
				message: '',
				data
			});
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/heat/map/alarm');

			res.status(500).json({
				status: false,
				message: error.message || error,
				data: null
			});
		}
	}

}

module.exports = new AlarmController();