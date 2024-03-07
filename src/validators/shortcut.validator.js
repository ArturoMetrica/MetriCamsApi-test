const Joi = require('joi');

class ShortcutValidator {
    addShortcut = () => {
        return Joi.object().keys({
            data: Joi.array().items(
                Joi.object().keys({
                    action: Joi.number().allow(null).required(),
                    chip: Joi.number().allow(null).required(),
                    filters: Joi.object().allow(null).required(),
                    filters_sec: Joi.object().allow(null).required(),
                    icon: Joi.string().allow(null).required(),
                    module_id: Joi.number().allow(null).required(),
                    name: Joi.string().allow(null).required(),
                    view: Joi.number().allow(null).required()
                })
            ),
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    updateShortcut = () => {
        return Joi.object().keys({
            data: Joi.array().items(
                Joi.object().keys({
                    action: Joi.number().allow(null).required(),
                    chip: Joi.number().allow(null).required(),
                    filters: Joi.object().allow(null).required(),
                    filters_sec: Joi.object().allow(null).required(),
                    icon: Joi.string().allow(null).required(),
                    module_id: Joi.number().allow(null).required(),
                    name: Joi.string().allow(null).required(),
                    view: Joi.number().allow(null).required()
                })
            ),
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    deleteShortcut = () => {
        return Joi.object().keys({
            shortcut_id: Joi.array().allow(null).required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }
}

module.exports = new ShortcutValidator();