const Validator = require('../validators/unknownDriver.validator');

class UnknownDriver {
    getAlarmsUnknownDriver = async(req, res, next) => {
        try {
            req.alarm = await Validator.getAlarmsUnknownDriver().validateAsync({
                ...req.headers,
                ...req.params,
                ...req.query,
                ...req.body
            });
            next();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    }
}

module.exports = new UnknownDriver();