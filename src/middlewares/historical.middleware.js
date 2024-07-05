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
}

module.exports = new historicalMiddleware();