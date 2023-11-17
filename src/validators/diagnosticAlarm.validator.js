const Joi = require('joi');

class Validator {
  getDiagnosticAlarm = () => {
    return Joi.object().keys({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      mdvrArr: Joi.array().items(Joi.string().required()).required(),
      alarmCodeArr: Joi.array().items(Joi.string().required()).optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new Validator();