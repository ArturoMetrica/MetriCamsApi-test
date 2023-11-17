const HumanFactorValidator = require('../validators/humanFactor.validator');

class HumanFactorMiddleware {
  getRiskAnalytics = async (req, res, next) => {
    try {
      req.risk = await HumanFactorValidator.getRiskAnalytics().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  getIncidentDetail = async (req, res, next) => {
    try {
      req.incident = await HumanFactorValidator.getIncidentDetail().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
}

module.exports = new HumanFactorMiddleware();