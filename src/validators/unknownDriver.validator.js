const Joi = require('joi');

class UnknownDriver {
  getAlarmsUnknownDriver = () => {
    return Joi.object().keys({
        startTime: Joi.string().required(),
        endTime: Joi.string().optional(),
        serials: Joi.array().default([]).optional(),
        alarmType: Joi.array().default([]).optional(),
      }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new UnknownDriver();