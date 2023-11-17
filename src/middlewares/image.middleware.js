// Importación del validador
const ImageValidator = require('../validators/image.validator');

class ImageMiddleware {
    // Obtener parámetros
    getImages = async (req, res, next) => {
        try {
            // Ejecutar validador
            req.image = await ImageValidator.getImages().validateAsync({
                ...req.headers,
                ...req.params,
                ...req.query,
                ...req.body
            });
            // Continuar con el Controller
            next();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    };

    // Obtener parámetros
    getImageDates = async (req, res, next) => {
        try {
            // Ejecutar validador
            req.image = await ImageValidator.getImageDates().validateAsync({
                ...req.headers,
                ...req.params,
                ...req.query,
                ...req.body
            });
            // Continuar con el Controller
            next();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    };
}

module.exports = new ImageMiddleware();
