const Joi = require('joi');

class templateService {
    addTemplate = () => {
        return Joi.object().keys({
            templateName: Joi.string().required(),
            templateType: Joi.number().required(),
            isDefault: Joi.boolean().default(false).optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    updateTemplate = () => {
        return Joi.object().keys({
            templateId: Joi.number().optional(),
            templateName: Joi.string().optional(),
            templateType: Joi.number().optional(),
            downloadId: Joi.string().optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    deleteTemplate = () => {
        return Joi.object().keys({
            templateId: Joi.string().required(),
            templateType: Joi.number().required(),
            downloadId: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    getTemplate = () => {
        return Joi.object().keys({
            templateId: Joi.number().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }
}

module.exports = new templateService();