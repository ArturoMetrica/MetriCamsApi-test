const Joi = require('joi');

const getHeatMapAlarm = () => {
  return Joi.object().keys({
    fromDate: Joi.string().required(),
    toDate: Joi.string().required()
  }).options({ allowUnknown: true, stripUnknown: true });
}

module.exports = {
    getHeatMapAlarm
}