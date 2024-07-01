const Joi = require('joi');

class StreamaxValidator {
    addRule = () => {
        return Joi.object().keys({
            idVehicle: Joi.array().optional().allow('[]'),
            idFleet: Joi.array().optional().allow('[]'),
            idAlarm: Joi.number().required(),
            ruleName: Joi.string().required(),
            desc: Joi.string().optional().allow(""),
            isPublic: Joi.boolean().required(),
            isPopup: Joi.boolean().required(),
            isEmail: Joi.boolean().required(),
            secsPre: Joi.number().required(),
            secsPos: Joi.number().required(),
            isActive: Joi.boolean().required(),
            emailList: Joi.array().optional(),
            creationDate: Joi.date().required().default(null),
            gifRequired: Joi.boolean().required().default(false),
            videoRequired: Joi.boolean().required().default(false),
            alarmCategoryId: Joi.number().required().default(2),
            zoneRestrictionIdEntry: Joi.string().required().default('').allow(null),
            zoneRestrictionNameEntry: Joi.string().required().default('').allow(null),
            zoneRestrictionIdExit: Joi.string().required().default('').allow(null),
            zoneRestrictionNameExit: Joi.string().required().default('').allow(null),
            zoneRestriction: Joi.boolean().required().default(false),
            zoneGeofence: Joi.boolean().required().default(false),
            zoneRuleIdEntry: Joi.string().required().default('').allow(null),
            zoneRuleNameEntry: Joi.string().required().default('').allow(null),
            zoneRuleIdExit: Joi.string().required().default('').allow(null),
            zoneRuleNameExit: Joi.string().required().default('').allow(null),
            cameraType: Joi.string().optional().default('DSM').allow(null),
            cameraTypeId: Joi.number().optional().default(1).allow(null)
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    updateRule = () => {
        return Joi.object().keys({
            idRule: Joi.number().required(),
            idVehicle: Joi.array().optional().allow('[]'),
            idFleet: Joi.array().optional().allow('[]'),
            idAlarm: Joi.number().required(),
            ruleName: Joi.string().required(),
            desc: Joi.string().optional().allow(""),
            isPublic: Joi.boolean().required(),
            isPopup: Joi.boolean().required(),
            isEmail: Joi.boolean().required(),
            secsPre: Joi.number().required(),
            secsPos: Joi.number().required(),
            isActive: Joi.boolean().required(),
            emailList: Joi.array().optional(),
            creationDate: Joi.date().required().default(null),
            gifRequired: Joi.boolean().required().default(false),
            videoRequired: Joi.boolean().required().default(false),
            alarmCategoryId: Joi.number().required().default(2),
            zoneRestrictionIdEntry: Joi.string().required().default('').allow(null),
            zoneRestrictionNameEntry: Joi.string().required().default('').allow(null),
            zoneRestrictionIdExit: Joi.string().required().default('').allow(null),
            zoneRestrictionNameExit: Joi.string().required().default('').allow(null),
            zoneRestriction: Joi.boolean().required().default(false),
            zoneGeofence: Joi.boolean().required().default(false),
            zoneRuleIdEntry: Joi.string().required().default('').allow(null),
            zoneRuleNameEntry: Joi.string().required().default('').allow(null),
            zoneRuleIdExit: Joi.string().required().default('').allow(null),
            zoneRuleNameExit: Joi.string().required().default('').allow(null),
            cameraType: Joi.string().optional().default('DSM').allow(null),
            cameraTypeId: Joi.number().optional().default(1).allow(null)
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    deleteRule = () => {
        return Joi.object().keys({
            idRule: Joi.number().required(),
        }).options({ allowUnknown: true, stripUnknown: true });
    }
}

module.exports = new StreamaxValidator();