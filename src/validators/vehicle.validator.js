const Joi = require('joi');

class VehicleValidator {
  addVehicle = () => {
    return Joi.object().keys({
      idGroup: Joi.number().required(),
      name: Joi.string().required(),
      plate: Joi.string().required(),
      vin: Joi.string().required(),
      model: Joi.string().optional(),
      comments: Joi.string().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  updateVehicle = () => {
    return Joi.object().keys({
      idVehicle: Joi.number().required(),
      name: Joi.string().required(),
      plate: Joi.string().required(),
      comments: Joi.string().optional(),
      idGroup: Joi.number().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteVehicle = () => {
    return Joi.object().keys({
      idVehicle: Joi.number().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new VehicleValidator();