const Joi = require('joi');

class AuthValidator {
  ssoLogin() {
    return Joi.object().keys({
      s: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  login() {
    return Joi.object().keys({
      d: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  loginConnector() {
    return Joi.object().keys({
      username: Joi.string().optional().allow(''),
      pass: Joi.string().optional(),
      token: Joi.string().optional(),
      langid: Joi.number().optional().default(2)
    }).options({ allowUnknown: true, stripUnknown: true });
  }

}

module.exports = new AuthValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/