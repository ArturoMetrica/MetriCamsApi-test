const Validator = require('../validators/classificationMessage.validator');
const DBService = require('../services/database');
const dbServoce = new DBService();

class ClassificationMessageMiddleware {
    async insertClassificationMessage(req, res, next) {
        try {
            req.classification = await Validator.insertClassificationMessage().validateAsync({
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

    async updateClassificationMessage(req, res, next) {
        try {
            req.classification = await Validator.updateClassificationMessage().validateAsync({
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

    async deleteClassificationMessage(req, res, next) {
        try {
            req.classification = await Validator.deleteClassificationMessage().validateAsync({
                ...req.query,
                ...req.params,
                ...req.headers,
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

    async classificateAllPages(req, res, next) {
        try {
            req.classification = await Validator.classificateAllPages().validateAsync({
                ...req.query,
                ...req.params,
                ...req.headers,
                ...req.body
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