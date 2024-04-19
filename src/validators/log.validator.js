const Joi = require('joi');

class LogValidator {
    saveNavigationLog () {
        return Joi.object().keys({
            username: Joi.string().required(),
            module: Joi.string().required(),
            notes: Joi.string().optional().default('')
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    errorLog () {
        return Joi.object().keys({
            identifier: Joi.string().required(),
            error: Joi.array().required(),
            module: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    exceptionsLog () {
        return Joi.object().keys({
            vehicles: Joi.array().required(),
            rulesS: Joi.array().required(),
            rulesG: Joi.array().required(),
            classification: Joi.string().required().allow(null),
            severity: Joi.string().required().allow(null),
            evidence: Joi.boolean().required().allow(null),
            isAttended: Joi.boolean().required(),
            isAutomaticUpdate: Joi.boolean().required(),
            startTime: Joi.string().required(),
            endTime: Joi.string().required(),
            limit: Joi.number().required(),
            totalRows: Joi.number().required(),
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    getExceptionsLog () {
        return Joi.object().keys({
            fromDate: Joi.string().required(),
            toDate: Joi.string().required(),
            offset: Joi.number().optional().default(-6),
        }).options({ allowUnknown: true, stripUnknown: true });
    }
}

module.exports = new LogValidator()