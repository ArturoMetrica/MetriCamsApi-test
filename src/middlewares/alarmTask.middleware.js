const Validator = require('../validators/alarmTask.validator');

class AlarmTaskMiddleware {
    async getTaskId(req, res, next) {
        try {
            req.alarm = await Validator.getTaskId().validateAsync({
                ...req.query,
                ...req.params
            });

            next();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    }

    async getAlarmsByUserPagination(req, res, next) {
        try {
            req.alarms = await Validator.getAlarmsByUserPagination().validateAsync({
                ...req.query,
                ...req.params,
                ...req.body
            });

            next();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    }
}

module.exports = new AlarmTaskMiddleware();