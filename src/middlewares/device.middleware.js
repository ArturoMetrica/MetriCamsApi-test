const deviceValidator = require('../validators/device.validator');

class deviceMiddleware {
    addDevice = async (req, res, next) => {
        try {
            req.device = await deviceValidator.addDevice().validateAsync({...req.body});

            next ();
        } catch (error) {
            res.status(400).json({status: false, message: error.message || error, data: null});
        }
    }

    updateDevice = async (req, res, next) => {
        try {
            req.device = await deviceValidator.updateDevice().validateAsync({...req.body});

            next ();
        } catch (error) {
            res.status(400).json({status: false, message: error.message || error, data: null});
        }
    }

    deleteDevice = async (req, res, next) => {
        try {
            req.device = await deviceValidator.deleteDevice().validateAsync({...req.body});

            next ();
        } catch (error) {
            res.status(400).json({status: false, message: error.message || error, data: null});
        }
    }
}

module.exports = new deviceMiddleware();