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

  getLastPosition = () => {
    return Joi.object().keys({
      mdvrArr: Joi.array().items(Joi.string().required()).required(),
      last : Joi.boolean().optional().default(false),
      startTime: Joi.string().optional(),
      endTime: Joi.string().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  } 
}

module.exports = new mdvrValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/