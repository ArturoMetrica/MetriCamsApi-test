const mdvrValidator = require('../validators/mdvr.validator');

class mdvrMiddleware {
  login = async (req, res, next) => {
    try {
      req.credentials = await mdvrValidator.login().validateAsync({
        ...req.body,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error });
    }
  }

  getMdvrOffset = async (req, res, next) => {
    try {
      req.mdvr = await mdvrValidator.getMdvrOffset().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error });
    }
  }
}

module.exports = new mdvrMiddleware();

/********************* Propiedad de Métrica Móvil SA de CV **************************/