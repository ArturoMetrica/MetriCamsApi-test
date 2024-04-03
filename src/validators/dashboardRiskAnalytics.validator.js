const Joi = require('joi');

class Validator {
    getVehiclesAndDriversByGroupsLevel = () => {
    return Joi.object().keys({
      idFleet: Joi.number().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new Validator();