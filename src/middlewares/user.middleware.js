const Validator = require('../validators/user.validator');

class ssoMiddleware {
  async updateUser(req, res, next) {
    try {
      req.user = await Validator.updateUser().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ code: 400, status: false, message: error.message, data: null });
    }
  }

  async deleteUser(req, res, next) {
    try {
      req.user = await Validator.deleteUser().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ code: 400, status: false, message: error.message, data: null });
    }
  }

  async getRegisteredUsers(req, res, next) {
    try {
      req.user = await Validator.getRegisteredUsers().validateAsync({
        ...req.body,
        ...req.query,
        ...req.headers
      });

      next();
    } catch (error) {
      res.status(400).json({ code: 400, status: false, message: error.message, data: null });
    }
  }

  async completeRegister(req, res, next) {
    try {
      req.user = await Validator.completeRegister().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ code: 400, status: false, message: error.message, data: null });
    }
  }
}

module.exports = new ssoMiddleware();

/********************* Propiedad de Métrica Móvil SA de CV **************************/