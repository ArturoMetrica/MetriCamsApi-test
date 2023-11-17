// Importación de paquetes
const Joi = require('joi');

class ImageValidator {
    // Validador de tipos de datos para la obtención de imágenes
    getImages = () => {
        return Joi.object()
            .keys({
                mdvr: Joi.string().required(),
                firstDate: Joi.string().required(),
                lastDate: Joi.string().required()
            })
            .options({ allowUnknown: true, stripUnknown: true });
    };

    // Validador de tipos de datos para la obtención de fechas de imágenes
    getImageDates = () => {
        return Joi.object()
            .keys({
                mdvr: Joi.string().required(),
            })
            .options({ allowUnknown: true, stripUnknown: true });
    };
}

module.exports = new ImageValidator();
