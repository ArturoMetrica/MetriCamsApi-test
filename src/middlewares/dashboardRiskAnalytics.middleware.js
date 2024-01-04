const Validator = require('../validators/dashboardRiskAnalytics.validator');

class Middleware {
    getVehiclesAndDriversByGroupsLevel = async (req, res, next) => {
    try {
      req.analytics = await Validator.getVehiclesAndDriversByGroupsLevel().validateAsync({
        ...req.params,
        ...req.query
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
}

module.exports = new Middleware();