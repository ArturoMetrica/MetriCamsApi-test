const Joi = require('joi');

const baseClassification = {
  idAlarm: Joi.number().required(),
  idClassificationMessage: Joi.number().optional().default(null),
  calification: Joi.boolean().optional().default(null),
  comment: Joi.string().optional().allow(null,""),
  ruleName: Joi.string().allow('').optional(),
  ruleId: Joi.number().allow('').optional()
}

const arrayOfNumbers = Joi.string()
  .regex(new RegExp(/\d+(\s*\,\s*\d+)*/))
  .custom((doc) => doc.split(',').map((e) => Number(e)))

class GeotabValidator {
  sessionId() {
    return Joi.object().keys({
      sessionid: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  insertGeotabRule() {
    return Joi.object().keys({
      idGeotabRule: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      secsPreEvent: Joi.number().required(),
      secsPosEvent: Joi.number().required(),
      creationDate: Joi.date().required(),
      isPublic: Joi.boolean().optional().default(false),
      isPopup: Joi.boolean().optional().default(false),
      isEmail: Joi.boolean().optional().default(false),
      emailList: Joi.array().required(),
      isActive: Joi.boolean().optional().default(false),
      gifRequired: Joi.boolean().optional().default(false),
      videoRequired: Joi.boolean().optional().default(false),
      idFleet: Joi.array().required(),
      idVehicle: Joi.array().required(),
      idAlarmCategory: Joi.number().required(),
      cams: Joi.array(),
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

  update() {
    return Joi.object().keys({
      idGeotabRuleSerial: Joi.number().required(),
      name: Joi.string().required(),
      idFleet: Joi.array().required(),
      idVehicle: Joi.array().required(),
      description: Joi.string().required(),
      secsPreEvent: Joi.number().required(),
      secsPosEvent: Joi.number().required(),
      isPublic: Joi.boolean().required(),
      isPopup: Joi.boolean().required(),
      isActive: Joi.boolean().required(),
      gifRequired: Joi.boolean().required(),
      videoRequired: Joi.boolean().required(),
      isEmail: Joi.boolean().required(),
      emailList: Joi.array().required(),
      idAlarmCategory: Joi.number().required(),
      cams: Joi.array(),
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

  delete() {
    return Joi.object()
      .keys({
        idGeotabRuleSerial: Joi.number().required(),
      }).options({ allowUnknown: true, stripUnknown: true });
  }

  getVehicles() {
    return Joi.object().keys({
      idGeotabRule: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  insertAlarm() {
    return Joi.object().keys({
      geotabGORule: Joi.string().required(),
      geotabGOId: Joi.string().required(),
      idDriver: Joi.string().required(),
      idAlarm: Joi.string().required(),
      duration: Joi.date().required(),
      altitude: Joi.number().required(),
      direction: Joi.number().required(),
      gpsTime: Joi.date().required(),
      gpsLat: Joi.number().required(),
      gpsLng: Joi.number().required(),
      speed: Joi.number().required(),
      recordSpeed: Joi.number().required(),
      state: Joi.number().required(),
      creationDate: Joi.date().required(),
      type: Joi.number().required(),
      content: Joi.string().required(),
      cmdType: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  setGeotabAlarmAttended() {
    return Joi.object().keys({
      idsGeotabAlarm: Joi.array().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  classificationAlarm() {
    return Joi.object().keys({
      idGeotabAlarm: Joi.number().required(),
      idClassificationMessage: Joi.number().required(),
      comment: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  verifiedGeotabAlarm() {
    return Joi.object().keys({
      idGeotabAlarm: Joi.number().required(),
      boolvalue: Joi.boolean().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getLocationLinks() {
    return Joi.object().keys({
      idGeotabRule: Joi.number().required(),
      channels: Joi.array().required(),
      source: Joi.string().optional().valid('streamax', 'geotab').default('geotab')
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  updateClassification() {
    return Joi.object().keys({
      idClassification: Joi.number().required(),
      idClassificationMessage: Joi.number().required(),
      comment: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getAlarmGeotabStreamax() {
    return Joi.object().keys({
      rulesS: Joi.array().required(),
      vehicles: Joi.array().required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
      statusP: Joi.boolean().optional().default(null),
      statusE: Joi.boolean().optional().default(null),
      rulesG: Joi.array().required(),
      offSet: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getAlarmGeotabStreamaxChart() {
    return Joi.object().keys({
      sessionid: Joi.string().required(),
      rulesS: Joi.array().optional().default([]),
      vehicles: Joi.array().required(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
      statusP: Joi.boolean().optional().default(null),
      statusE: Joi.boolean().optional().default(null),
      rulesG: Joi.array().optional().default([]),
      offSet: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  classificationGeotabByUser() {
    return Joi.object().keys({
      alarmArr: Joi.array().items(
        Joi.object().keys(baseClassification)
      )
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  classificationStreamaxByUser() {
    return Joi.object().keys({
      alarmArr: Joi.array().items(
        Joi.object().keys(baseClassification)
      ).required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new GeotabValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/