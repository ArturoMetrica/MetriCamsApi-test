const Validator = require('../validators/diagnosticAlarm.validator');

class Middleware {
  getDiagnosticAlarm = async (req, res, next) => {
    try {
      req.diagnosticAlarm = await Validator.getDiagnosticAlarm().validateAsync({ ...req.body });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
}

module.exports = new Middleware();