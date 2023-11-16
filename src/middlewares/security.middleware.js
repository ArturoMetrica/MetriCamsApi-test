const SecurityValidator = require('../validators/security.validator');

class SecurityMiddleware {
  async verifyApiKey(req, res, next) {
    try {
      await SecurityValidator.verifyApiKey().validateAsync({ ...req.headers });
      next();
    } catch (error) {
      res.status(401).json({ status: false, message: 'Unauthorized, invalid x-api-key', data: null });
    }
  }
}

module.exports = new SecurityMiddleware();