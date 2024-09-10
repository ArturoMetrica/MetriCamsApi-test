const Joi = require('joi');

const getDataUsage = () => {
  return Joi.object().keys({
    offset: Joi.number().required(),
  }).options({ allowUnknown: true, stripUnknown: true });
}

module.exports = {
    getDataUsage
}