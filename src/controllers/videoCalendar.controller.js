const DBService = require('../services/database');
const dbService = new DBService();
const FTAPIService = require('../services/FT_API.service');
const moment = require('moment');

class videoCalendar {
    async getMonthlyVideoRecord(req, res) {
        try {
            const { token, uniqueId, streamType, month, storageType, timeZoneOffset } = req.calendar;

            const { success, message, data } = await FTAPIService.getMonthlyCalendar(token, uniqueId, streamType, month, storageType, timeZoneOffset);

            let formatData = [];

            if(!success) throw message;

            formatData = data.map(e => {
            let dateFormat = moment(e.existsDate).format('DD-MM-YYYY');
            return {...e, existsDate: dateFormat}
            });

            res.status(200).json({
                status: success,
                message: message,
                data: formatData
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/monthly-calendar');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

		getDailyVideoRecord = async (req, res) => {
			try {
				const { token, uniqueId, streamType, channels, day, storageType, timeZoneOffset } = req.calendar;
	
				const { data, success, message } = await FTAPIService.getDailyCalendar(token, uniqueId, streamType, channels, day, storageType, timeZoneOffset);
	
				if(!success) throw message;
	
				res.status(200).json({
					status: true,
					message: '',
					data
				});
			} catch (error) {
				res.status(500).json({
					status: false,
					message: error.message || error,
					data: null
				});
			}
		}

		getMinuteVideoRecord = async (req, res) => {
			try {
				const { token, uniqueId, streamType, channels, startTime, endTime, storageType } = req.calendar;

				const { data, success, message } = await FTAPIService.getMinuteCalendar(token, uniqueId, streamType, channels, startTime, endTime, storageType);

				if(!success) throw message;

				res.status(200).json({
					status: true,
					message: '',
					data
				});

			} catch (error) {
				res.status(500).json({
					status: false,
					message: error.message || error,
					data: null
				})
			}
		}
}

module.exports = new videoCalendar();