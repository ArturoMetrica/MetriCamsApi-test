const Joi = require('joi');

class ShortcutValidator {
    addShortcut = () => {
        return Joi.object().keys({
            data: Joi.array().items(
                Joi.object().keys({
                    action: Joi.number().optional(),
                    chip: Joi.number().optional(),
                    filters: Joi.array().optional(),
                    filters_sec: Joi.array().optional(),
                    icon: Joi.string().optional(),
                    module_id: Joi.number().optional(),
                    name: Joi.string().optional(),
                    view: Joi.number().optional()
                })
            ),
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    updateShortcut = () => {
        return Joi.object().keys({
            data: Joi.array().items(
                Joi.object().keys({
                    action: Joi.number().optional(),
                    chip: Joi.number().optional(),
                    filters: Joi.array().optional(),
                    filters_sec: Joi.array().optional(),
                    icon: Joi.string().optional(),
                    module_id: Joi.number().optional(),
                    name: Joi.string().optional(),
                    view: Joi.number().optional()
                })
            ),
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    deleteShortcut = () => {
        return Joi.object().keys({
            shortcut_id: Joi.array().optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    }
}

module.exports = new ShortcutValidator();