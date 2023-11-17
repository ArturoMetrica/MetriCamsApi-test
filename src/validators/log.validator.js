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
}

module.exports = new LogValidator()