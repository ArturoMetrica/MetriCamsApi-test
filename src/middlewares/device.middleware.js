const DeviceValidator = require('../validators/device.validator');

class DeviceMiddleware {
  addDevice = async (req, res, next) => {
    try {
      req.device = await DeviceValidator.addDevice().validateAsync({ ...req.body });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
}

module.exports = new DeviceMiddleware();