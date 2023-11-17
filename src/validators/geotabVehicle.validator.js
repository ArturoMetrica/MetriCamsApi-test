const Joi = require('joi');

class Validator {
  getVehicles = () => {
    return Joi.object().keys({
      s: Joi.string().required(),
      id: Joi.string().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new Validator();