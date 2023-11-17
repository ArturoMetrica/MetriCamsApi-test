const Joi = require('joi');

class CatalogueValidator {
    updateVisibilityForDinamicExceptions () {
        return Joi.object().keys({
            params: Joi.array().items(
                Joi.object().keys({
                    column_name: Joi.string().required(),
                    visibility: Joi.boolean().required()
                })
            ).required(),
        }).options({ allowUnknown: true, stripUnknown: true })
    }
}

module.exports = new CatalogueValidator();