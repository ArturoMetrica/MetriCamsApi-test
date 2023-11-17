const Joi = require('joi');

class Validator {
  getStatistics = () => {
    return Joi.object().keys({
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
      offset: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getZoomAlerts = () => {
    return Joi.object().keys({
      driver: Joi.string().required().allow(''),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
      offset: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new Validator();