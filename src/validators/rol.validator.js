const Joi = require('joi');

class RolValidator {
  createRol() {
    return Joi.object()
      .keys({
        id: Joi.number().allow(null).default(null).optional(),
        name: Joi.string().required(),
        permissions: Joi.array().required(),
        action: Joi.string().default(1).optional(),
        idGroup: Joi.number().allow(null).default(null).optional(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  updateRol() {
    return Joi.object()
      .keys({
        id: Joi.number().allow(null).default(null).optional(),
        name: Joi.string().required(),
        permissions: Joi.array().required(),
        action: Joi.string().default(2).optional(),
        idGroup: Joi.number().allow(null).default(null).optional(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  deleteRol() {
    return Joi.object()
      .keys({
        id: Joi.number().allow(null).default(null).optional(),
        name: Joi.string().required(),
        permissions: Joi.array().allow(null).default(null).optional(),
        action: Joi.string().default(3).optional(),
        idGroup: Joi.number().allow(null).default(null).optional(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new RolValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/