const Joi = require('joi');

class GeotabDriverValidator {
  getDriver = () => {
    return Joi.object().keys({
      id: Joi.string().optional(),
      s: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new GeotabDriverValidator();