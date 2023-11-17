const Joi = require('joi');

class LimitValidator {
  insertDataUsage = () => {
    return Joi.object().keys({
      mdvr: Joi.string().required(),
      date: Joi.date().required(),
      duration: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getLimitArr = () => {
    return Joi.object().keys({
      vehicles: Joi.array().min(1).optional().default(null),
      offset: Joi.number().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  configDataUsage = () => {
    return Joi.object().keys({
      id: Joi.number().valid(0, 1, 2, 3).required(),
      config: Joi.object().keys({
        MB: Joi.number().required().min(0),
        data: Joi.number().required().min(0),
      }).required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getConfigDataUsage = () => {
    return Joi.object().keys({
      id: Joi.number().valid(0, 1, 2, 3).optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new LimitValidator();