const VehicleValidator = require('../validators/vehicle.validator');

class VehicleMiddleware {
  addVehicle = async (req, res, next) => {
    try {
      req.vehicle = await VehicleValidator.addVehicle().validateAsync({ ...req.body });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
}

module.exports = new VehicleMiddleware();