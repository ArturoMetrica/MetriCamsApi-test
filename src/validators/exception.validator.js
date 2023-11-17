const Joi = require('joi');

class Validator {
    getAttendedAlarmsCount () {
        return Joi.object().keys({
            startTime: Joi.string().required(),
            endTime: Joi.string().required(),
            deviceIdArr: Joi.array().required(),
            sRuleArr: Joi.array().required(),
            gRuleArr: Joi.array().required(),
            offset: Joi.number().default(-6).optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    }
}

module.exports = new Validator();