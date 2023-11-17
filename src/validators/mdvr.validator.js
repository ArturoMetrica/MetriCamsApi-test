const Joi = require('joi');

class mdvrValidator {
  login = () => {
    return Joi.object().keys({
      d: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getMdvrOffset = () => {
    return Joi.object().keys({
      token: Joi.string().required(),
      mdvrArr: Joi.array().default([]).optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new mdvrValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/