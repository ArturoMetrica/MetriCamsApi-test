const Joi = require('joi');

class GeotabValidator {
  updateStreamaxRule() {
    return Joi.object().keys({
      id: Joi.number().required(),
      sessionid: Joi.string().required(),
      idVehicles: Joi.array().items().optional().allow(null).default(null),
      groups: Joi.array().optional().allow(null).default(null),
      idAlarm: Joi.number().required(),
      name: Joi.string().required(),
      desc: Joi.string().optional().allow('').default(''),
      isPublic: Joi.boolean().required(),
      isPopup: Joi.boolean().required(),
      isEmail: Joi.boolean().required(),
      secsPre: Joi.number().required(),
      secsPos: Joi.number().required(),
      isActive: Joi.boolean().required(),
      emails: Joi.array().required(),
      action: Joi.number().optional().default(2),
      creationDate: Joi.date().optional().default(null),
      gifRequired: Joi.boolean().optional().default(false),
      videoRequired: Joi.boolean().optional().default(false),
      alarmcategoryid: Joi.number().optional().default(2),
      zoneRestrictionIdEntry: Joi.string().required().allow(null), 
      zoneRestrictionNameEntry: Joi.string().required().allow(null), 
      zoneRestrictionIdExit: Joi.string().required().allow(null), 
      zoneRestrictionNameExit: Joi.string().required().allow(null),
      zoneRestriction: Joi.boolean().required(),
      zoneGeofence: Joi.boolean().optional().allow(false),
      zoneRuleIdEntry: Joi.string().optional().allow(null),
      zoneRuleNameEntry: Joi.string().optional().allow(null),
      zoneRuleIdExit: Joi.string().optional().allow(null),
      zoneRuleNameExit: Joi.string().optional().allow(null)
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  insertStreamaxTaskIds() {
    return Joi.object().keys({
          idAlarm: Joi.number().required(),
          taskId: Joi.string().required(),
          serialMdvr: Joi.string().required(),
          cameras: Joi.array().items(Joi.object()).required(),
          date: Joi.date().raw().required(),
          driverId: Joi.string().optional().default(null),
          driverName: Joi.string().optional().default(null),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

}

module.exports = new GeotabValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/