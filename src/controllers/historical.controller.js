const FTService = require('../services/FT_API.service');
const DBService = require('../services/database');
const historicalService = require("../services/historical.service");
const { errorLogs } = new DBService();
const handleResponseUtil = require('../utils/handleResponse.util');

const historyStreamingVideo = async (req, res) => {
	try {
		const { serialMdvr, channels, endTime, startTime, storeType, streamType, streamingProtocol } = req.history;

        const data  = await FTService.historyStreamingVideo(serialMdvr, channels, endTime, startTime, storeType, streamType, streamingProtocol);

		if (data.code == 500) {
			return res.status(200).json({
				status: false,
				message: data.message,
				data: [],
				errorCode: 201052
			  });
		}

        res.status(200).json({
            status: true,
            message: '',
            streamingProtocol,
            data: data.data.data
          });

		// handleResponseUtil(res, 200, true, 'ok', null);
	} catch (error) {
		await errorLogs('API', error, '/api/historical');
		handleResponseUtil(res, 500, false, error.message || error, []);
	}
}

const stopDeviceStreaming = async (req, res) => {
	try {
		const { session } = req.streaming;

		const data = await Promise.all(session.map(async (e) => {
			const res = await FTService.stopDeviceStreaming(e);
			return {
				data: res
			}
		}));

		res.status(200).json({
            status: true,
            message: '',
            data: true
          });
	} catch (error) {
		await errorLogs('API', error, '/api/historical/stop');
		handleResponseUtil(res, 500, false, error.message || error, []);
	}
}

const getHistoricalVideoDownloadConfig = async (req, res) => {
	try {
		const { sessionid } = req.sessionid;

		const data = await historicalService.getHistoricalVideoDownloadConfig(sessionid);

		res.status(200).json({
            status: true,
            message: '',
            data
          });
	} catch (error) {
		
	}
}

module.exports = {
	historyStreamingVideo,
	stopDeviceStreaming,
	getHistoricalVideoDownloadConfig
}