const Joi = require('joi');

class ClassificationMessageValidator {
    getVehiclesData () {
        return Joi.object().keys({
            vehicles: Joi.array().required(),
            langId: Joi.number().optional(),
            offSet: Joi.number().optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    }
}

module.exports = new ClassificationMessageValidator();