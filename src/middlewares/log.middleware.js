const LogValidator = require('../validators/log.validator');
const DBService = require('../services/database');

class LogMiddleware {
    async saveNavigationLog(req, res, next) {
        try {
            req.log = await LogValidator.saveNavigationLog().validateAsync({
                ...req.headers,
                ...req.body
            });

            next();
        } catch (error) {
            console.log(error);
        }
    }

    async errorLog(req, res, next) {
        try {
            req.log = await LogValidator.errorLog().validateAsync({
                ...req.headers,
                ...req.body
            });

            next ();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new LogMiddleware();