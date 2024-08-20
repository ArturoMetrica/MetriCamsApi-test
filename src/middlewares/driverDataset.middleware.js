const handleResponseUtil = require('../utils/handleResponse.util');
const driverDatasetValidator = require('../validators/driverDataset.validator');

class DriverDatasetMiddleware {
    updateDriverDataset = async (req, res, next) => {
        try {
            req.driver = await driverDatasetValidator.updateDriverDataset().validateAsync({
                ...req.headers,
                ...req.params,
                ...req.query,
                ...req.body
            });
            
            next();
        } catch (error) {
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    };
}

module.exports = new DriverDatasetMiddleware();