const Validator = require('../validators/token.validator');
const dbService = require('../services/database');
const { checkValidToken } = new dbService();

class Middleware {
  async verify(req, res, next) {
    try {
      req.sessionid = await Validator.verify().validateAsync({
        ...req.headers
      });
      await checkValidToken(req.sessionid);
      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async check (req, res, next) {
    try {
        req.sessionid = await Validator.check().validateAsync({
            ...req.headers
        });

        next ();
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}
}

module.exports = new Middleware();

/********************* Propiedad de Métrica Móvil SA de CV **************************/