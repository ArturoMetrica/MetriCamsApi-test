const FTService = require('../services/FT_API.service');
const DBService = require('../services/database');
const { errorLogs } = new DBService();
const handleResponseUtil = require('../utils/handleResponse.util');

const historyStreamingVideo = async (req, res) => {
	try {
		const { serialMdvr, channels, endTime, startTime, storeType, streamType, streamingProtocol } = req.history;

        const { data, message, success } = await FTService.historyStreamingVideo(serialMdvr, channels, endTime, startTime, storeType, streamType, streamingProtocol);

      if (success) {
        res.status(200).json({
            status: true,
            message: '',
            streamingProtocol,
            data
          });
      }

		handleResponseUtil(res, 200, true, 'ok', null);
	} catch (error) {
		await errorLogs('API', error, '/api/historical');
		handleResponseUtil(res, 500, false, error.message || error, []);
	}
}

module.exports = {
	historyStreamingVideo
}