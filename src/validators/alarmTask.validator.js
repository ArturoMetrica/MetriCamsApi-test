const Joi = require('joi');

class AlarmTaskValidator {

    getTaskId() {
        return Joi.object()
            .keys({
                idAlarm: Joi.number().required(),
                source: Joi.string().required().default('streamax').allow('streamax', 'geotab')
            })
            .options({ allowUnknown: true, stripUnknown: true })
    }
    getAlarmsByUserPagination() {
        return Joi.object().keys({
            startTime: Joi.string().required(),
            endTime: Joi.string().required(),
            vehicles: Joi.array().required(),
            rulesG: Joi.array().required(),
            rulesS: Joi.array().required(),
            severity: Joi.array().optional(),
            evidence: Joi.boolean().valid(null, true, false).optional(),
            classification: Joi.array().default(null).optional(),
            offSet: Joi.number().default(-5).optional(),
            rowNumber: Joi.number().default(0).optional(),
            limit: Joi.number().default(10).optional(),
            isAttended: Joi.boolean().valid(null, true, false).optional()
          }).options({ allowUnknown: true, stripUnknown: true });
        }
}

module.exports = new AlarmTaskValidator();