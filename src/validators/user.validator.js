const Joi = require('joi');

class UserValidator {
  updateUser() {
    return Joi.object()
      .keys({
        sessionid: Joi.string().required(),
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        idSecLevel: Joi.number().required(),
        groups: Joi.array().items(Joi.number()).required(),
        email: Joi.string().required(),
        action: Joi.number().optional().allow(null).default(2),
        phone: Joi.array().items(Joi.string()).optional().allow(null).default(null),
        birthday: Joi.string().optional().allow(null).default(null),
        idUser: Joi.number().required(),
        idTimezone: Joi.number().optional().allow(null).default(null),
        isSummerTime: Joi.boolean().optional().allow(null).default(null),
        isMetricamovil_user: Joi.boolean().optional().allow(null).default(false),
        userDefinedTime: Joi.array().items(
          Joi.object().keys({
            severity: Joi.string().optional(),
            timeUnit: Joi.string().optional(),
            value: Joi.number().optional()
          })
        ).optional().default([])
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  deleteUser() {
    return Joi.object()
      .keys({
        sessionid: Joi.string().required(),
        action: Joi.number().optional().allow(null).default(3),
        iduser: Joi.number().required()
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  getRegisteredUsers() {
    return Joi.object()
      .keys({
        sessionid: Joi.string().required(),
        isregistered: Joi.number().required()
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  completeRegister() {
    return Joi.object()
      .keys({
        code: Joi.string().required(),
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  setUserDuration() {
    return Joi.object().keys({
      username: Joi.string().required(),
      module: Joi.string().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
      seconds: Joi.number().required(),
    })
      .options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new UserValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/