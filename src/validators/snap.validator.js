const Joi = require('joi');

class SnapValidator {
    // Validador de tipos de datos para la obtención de snapshots
    getSnaps = () => {
        return Joi.object().keys({
            mdvr: Joi.string().required(),
            firstDate: Joi.date().required(),
            lastDate: Joi.date().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    };

    // Validador de tipos de datos para la obtención de fechas de imágenes
    getSnapDates = () => {
        return Joi.object().keys({
            mdvr: Joi.string().required(),
        }).options({ allowUnknown: true, stripUnknown: true });
    };

    // Validador de datos para la obtención del límite de datos
    getDataUsage = () => {
        return Joi.object().keys({
            vehicles: Joi.array().required(),
            offSet: Joi.number().default(-6).optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    };

    // Validador de datos para la obtención de últimas capturas
    getLastsSnapshots = () => {
        return Joi.object().keys({
            sessionid: Joi.string().required(),
            serials: Joi.array().optional(),
            rowsOffset: Joi.number().default(0).optional(),
            rowsLimit: Joi.number().default(50).optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    };
}

module.exports = new SnapValidator();
