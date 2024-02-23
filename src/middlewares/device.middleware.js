const handleResponseUtil = require('../utils/handleResponse.util');
const deviceValidator = require('../validators/device.validator');

class deviceMiddleware {
	addDevice = async (req, res, next) => {
		try {
			req.device = await deviceValidator.addDevice().validateAsync({ ...req.body });

			next();
		} catch (error) {
			handleResponseUtil(res, 400, false, error.message || error, null);
		}
	}

	updateDevice = async (req, res, next) => {
		try {
			req.device = await deviceValidator.updateDevice().validateAsync({ ...req.body });

			next();
		} catch (error) {
			handleResponseUtil(res, 400, false, error.message || error, null);
		}
	}

	deleteDevice = async (req, res, next) => {
		try {
			req.device = await deviceValidator.deleteDevice().validateAsync({ ...req.body });

			next();
		} catch (error) {
			handleResponseUtil(res, 400, false, error.message || error, null);
		}
	}
}

module.exports = new deviceMiddleware();