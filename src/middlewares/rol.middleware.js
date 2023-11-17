const Validator = require('../validators/rol.validator');

class ssoMiddleware {
  async createRol(req, res, next) {
    try {
      req.rol = await Validator.createRol().validateAsync({
        ...req.body,
        ...req.query
      });

      next();
    } catch (error) {
      res.status(400).json({ code: 400, status: false, message: error.message, data: null });
    }
  }

  async updateRol(req, res, next) {
    try {
      req.rol = await Validator.updateRol().validateAsync({
        ...req.body,
        ...req.query
      });

      next();
    } catch (error) {
      res.status(400).json({ code: 400, status: false, message: error.message, data: null });
    }
  }

  async deleteRol(req, res, next) {
    try {
      req.rol = await Validator.deleteRol().validateAsync({
        ...req.body,
        ...req.query
      });

      next();
    } catch (error) {
      res.status(400).json({ code: 400, status: false, message: error.message, data: null });
    }
  }
}

module.exports = new ssoMiddleware();

/********************* Propiedad de Métrica Móvil SA de CV **************************/