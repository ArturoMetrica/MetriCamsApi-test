const handleResponseUtil = require('../utils/handleResponse.util');
const streamaxValidator = require('../validators/streamax.validator');

class StreamaxMiddleware {
    addRule = async (req, res, next) => {
        try {
            req.rule = await streamaxValidator.addRule().validateAsync({ ...req.body });

            next ();
        } catch (error) {
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    }

    updateRule = async (req, res, next) => {
        try {
            req.rule = await streamaxValidator.updateRule().validateAsync({ ...req.body });

            next ();
        } catch (error) {
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    }

    deleteRule = async (req, res, next) => {
        try {
            req.rule = await streamaxValidator.deleteRule().validateAsync({ ...req.body, ...req.query, ...req.params });

            next ();
        } catch (error) {
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    }
}

module.exports = new StreamaxMiddleware();