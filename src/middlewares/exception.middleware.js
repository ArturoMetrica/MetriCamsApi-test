const exceptionValidator = require('../validators/exception.validator');

class Middleware {
    async getAttendedAlarmsCount (req, res, next) {
        try {
            req.exception = await exceptionValidator.getAttendedAlarmsCount().validateAsync({
                ...req.query,
				...req.params,
				...req.body,
            });

            next ();
        } catch (error) {
            res.status(400).send('Los parámetros proporcionados no son correctos');
        }
    }
}

module.exports = new Middleware();