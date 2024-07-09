const FTService = require('../services/FT_API.service');
const DBService = require('../services/database');
const { errorLogs } = new DBService();
const handleResponseUtil = require('../utils/handleResponse.util');

const historyStreamingVideo = async (req, res) => {
	try {
		const { serialMdvr, channels, endTime, startTime, storeType, streamType, streamingProtocol } = req.history;

        const { data, success }  = await FTService.historyStreamingVideo(serialMdvr, channels, endTime, startTime, storeType, streamType, streamingProtocol);

        res.status(200).json({
            status: true,
            message: '',
            streamingProtocol,
            data: data.data
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
		const { data } = await FTService.stopDeviceStreaming(session);

		res.status(200).json({
            status: true,
            message: '',
            data: data.data
          });
	} catch (error) {
		await errorLogs('API', error, '/api/historical/stop');
		handleResponseUtil(res, 500, false, error.message || error, []);
	}
}

module.exports = {
	historyStreamingVideo,
	stopDeviceStreaming
}