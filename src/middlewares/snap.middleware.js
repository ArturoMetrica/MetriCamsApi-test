const handleResponseUtil = require('../utils/handleResponse.util');
const snapValidator = require('../validators/snap.validator');

class snapMiddleware {
    getSnaps = async (req, res, next) => {
        try {
            req.snap = await snapValidator.getSnaps().validateAsync({
                ...req.headers,
                ...req.params,
                ...req.query,
                ...req.body
            });

            next();
        } catch (error) {
            // res.status(400).json({ status: false, message: error.message || error, data: null });
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    };

    getSnapDates = async (req, res, next) => {
        try {
            req.snap = await snapValidator.getSnapDates().validateAsync({
                ...req.headers,
                ...req.params,
                ...req.query,
                ...req.body
            });
            
            next();
        } catch (error) {
            // res.status(400).json({ status: false, message: error.message || error, data: null });
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    };

    getDataUsage = async (req, res, next) => {
        try {
            req.usage = await snapValidator.getDataUsage().validateAsync({
                ...req.headers,
                ...req.params,
                ...req.query,
                ...req.body
            });
            
            next ();
        } catch (error) {
            // res.status(400).json({ status: false, message: error.message || error, data: null });
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    }

    getLastsSnapshots = async (req, res, next) => {
        try {
            req.snaps = await snapValidator.getLastsSnapshots().validateAsync({
                ...req.headers,
                ...req.params,
                ...req.query,
                ...req.body
            });

            next ();
        } catch (error) {
            // res.status(400).json({ status: false, message: error.message || error, data: null });
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    }
}

module.exports = new snapMiddleware();