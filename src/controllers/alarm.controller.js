const alarmService = require('../services/alarm.service');
const DBService = require('../services/database');
const dbService = new DBService();
const _ = require('lodash');

class AlarmController {
	async getHeatMapAlarm(req, res) {
		try {
			const { sessionid } = req.sessionid;
			const { fromDate, toDate } = req.alarm;

			const data = await alarmService.getHeatMapAlarm(sessionid, fromDate, toDate);
			return res.status(200).json({
				status: true,
				message: '',
				data
			});
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/heat/map/alarm');

			return res.status(500).json({
				status: false,
				message: error.message || error,
				data: null
			});
		}
	}

	async getAlarmsByGroup(req, res) {
		try {
			const { sessionid } = req.sessionid;
			const { fromDate, toDate } = req.alarm;

			const data = await alarmService.getAlarmsByGroup(sessionid, fromDate, toDate);

			const arr = data.map(e => {
				const groupedFields = _.groupBy(e.alarms, 'ruleName');
				const groupedFieldsWithCount = _.mapValues(groupedFields, (items) => items.length);
				return {
					...e,
					groupedFields: groupedFieldsWithCount
				};
			});

			return res.status(200).json({
				status: true,
				message: '',
				data: arr
			});

		} catch (error) {
			await dbService.errorLogs('API', error, '/api/alarm/group');

			return res.status(500).json({
				status: false,
				message: error.message || error,
				data: null
			});
		}
	}

	async getAlarmsByDriver(req, res) {
		try {
			const { sessionid } = req.sessionid;
			const { fromDate, toDate } = req.alarm;

			const data = await alarmService.getAlarmsByDriver(sessionid, fromDate, toDate);

			const alarmsGroupedByDriver = _.groupBy(data, 'driverId');

			const updatedDrivers = _.map(alarmsGroupedByDriver, (alarms, driverId) => {
				const driverName = alarms[0].driverName || 'UnknownDriver';

				return {
					driverName: driverName,
					driverId: driverId,
					alarms: alarms,
					alarmsLength: alarms.length
				};
			});

			return res.status(200).json({
				status: true,
				message: '',
				data: updatedDrivers
			});
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/alarm/driver');

			return res.status(500).json({
				status: false,
				message: error.message || error,
				data: null
			});
		}
	}

}

module.exports = new AlarmController();