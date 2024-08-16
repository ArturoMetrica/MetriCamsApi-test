const handleResponseUtil = require('../utils/handleResponse.util');
const historicalValidator = require('../validators/historical.validator');

class historicalMiddleware {
	historyStreamingVideo = async (req, res, next) => {
		try {
            const { isMac } = req.useragent;

			req.history = await historicalValidator.historyStreamingVideo().validateAsync({ ...req.body });

            if (isMac) req.history.streamingProtocol = 'HLS';

			next();
		} catch (error) {
			handleResponseUtil(res, 400, false, error.message || error, null);
		}
	}

	stopDeviceStreaming = async (req, res, next) => {
		try {
			req.streaming = await historicalValidator.stopDeviceStreaming().validateAsync({ ...req.body });

			next ();
		} catch (error) {
			handleResponseUtil(res, 400, false, error.message || error, null);
		}
	}

	getAlarmsForVideoTransmission = async (req, res, next) => {
		try {
			req.alarms = await historicalValidator.getAlarmsForVideoTransmission().validateAsync({ ...req.query, ...req.params });

			next ();
		} catch (error) {
			handleResponseUtil(res, 400, false, error.message || error, null);
		}
	}
}

module.exports = new historicalMiddleware();