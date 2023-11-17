const Validator = require('../validators/dashboardStatistics.validator');

class Middleware {
  getStatistics = async (req, res, next) => {
    try {
      req.statistics = await Validator.getStatistics().validateAsync({
        ...req.params,
        ...req.query
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  getZoomAlerts = async (req, res, next) => {
    try {
      req.zoom = await Validator.getZoomAlerts().validateAsync({
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