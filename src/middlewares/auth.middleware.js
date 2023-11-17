const Validator = require('../validators/auth.validator');

class AuthMiddleware {
  async ssoLogin(req, res, next) {
    try {
      req.auth = await Validator.ssoLogin().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ code: 400, status: false, message: 'An error has occurred', data: null });
    }
  }

  async login(req, res, next) {
    try {
      req.auth = await Validator.login().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ code: 400, status: false, message: 'An error has occurred', data: null });
    }
  }
  async loginConnector (req, res, next) {
    try {
        req.auth = await Validator.loginConnector().validateAsync({
            ...req.body
        });

        next ();
        
    } catch (error) {
        res.status(400).json({
            code: 400,
            status: false,
            message: error.message,
            data: null
        })
    }
}

}

module.exports = new AuthMiddleware();

/********************* Propiedad de Métrica Móvil SA de CV **************************/