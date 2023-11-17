const Validator = require('../validators/watchDog.validator');
const DBService = require('../services/database');
const dbServoce = new DBService();

class ClassificationMessageMiddleware {
    async getVehiclesData(req, res, next) {
        try {
            req.info = await Validator.getVehiclesData().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body,
            });

            next ();
        } catch (error) {
            console.log(error);
            res.status(400).json({ 
                status: false, 
                message: error.message || error,
                data: null
            });
        }
    }
}

module.exports = new ClassificationMessageMiddleware();