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

  getDeviceHealthStartEndDatetime = () => {
    return Joi.object().keys({
      fromDate: Joi.date().required(),
      toDate: Joi.date().required(),
      serials: Joi.array().required(),
      alarmCode: Joi.array().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new Validator();