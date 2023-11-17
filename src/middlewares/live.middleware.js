const LiveValidator = require('../validators/live.validator')
const DBService = require('../services/database')
const dbService = new DBService()
class LiveMiddleware {
  async getLiveLink(req, res, next) {
    try {
      req.live = await LiveValidator.getLiveLink().validateAsync({
        ...req.params,
        ...req.headers
      });
      await dbService.checkValidToken(req.headers);
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LiveMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/