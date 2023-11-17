const Joi = require('joi');

class ClassificationMessageValidator {
    insertClassificationMessage() {
        return Joi.object().keys({
            message: Joi.string().required(),
            groups: Joi.array().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    updateClassificationMessage() {
        return Joi.object().keys({
            id: Joi.number().required(),
            message: Joi.string().required(),
            groups: Joi.array().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    deleteClassificationMessage() {
        return Joi.object().keys({
            classifications: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }
}

module.exports = new ClassificationMessageValidator();