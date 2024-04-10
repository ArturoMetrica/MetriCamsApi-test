const Joi = require('joi');

const getAlarmStatusByDate = () => {
  return Joi.object().keys({
    fromDate: Joi.string().required(),
    toDate: Joi.string().required(),
    minRecords: Joi.string().optional(),
  }).options({ allowUnknown: true, stripUnknown: true });
}

module.exports = {
  getAlarmStatusByDate
}