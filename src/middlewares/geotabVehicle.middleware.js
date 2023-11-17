const Validator = require('../validators/geotabVehicle.validator');

class Middleware {
  getVehicles = async (req, res, next) => {
    try {
      req.vehicle = await Validator.getVehicles().validateAsync({
        ...req.params,
        ...req.query,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
}

module.exports = new Middleware();