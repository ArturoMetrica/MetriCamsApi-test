const StreamaxRuleValidator = require("../validators/streamaxRule.validator");
const DBService = require("../services/database");
const streamaxRuleValidator = require("../validators/streamaxRule.validator");
const { checkValidToken } = new DBService();

class StreamaxRuleMiddleware {
  async updateStreamaxRule(req, res, next) {
    try {
      req.rule = await StreamaxRuleValidator.updateStreamaxRule().validateAsync({
        ...req.query,
        ...req.headers,
        ...req.body,
      })
      next()
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error });
    }
  }

  async insertStreamaxTaskIds(req, res, next) {
    try {
      req.taskId = await streamaxRuleValidator.insertStreamaxTaskIds().validateAsync({
        ...req.query,
        ...req.headers,
        ...req.body,
      });
      next();
    } catch(error) {
      res.status(400).json({
        status: false,
        message: error.message || error
      });
    }
  }

}

module.exports = new StreamaxRuleMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/