const GeotabDriverValidator = require('../validators/geotabDriver.validator');

class GeotabDriverMiddleware {
  getDriver = async (req, res, next) => {
    try {
      req.driver = await GeotabDriverValidator.getDriver().validateAsync({
        ...req.params,
        ...req.query
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
}

module.exports = new GeotabDriverMiddleware();