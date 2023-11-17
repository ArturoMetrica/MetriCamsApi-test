const Validator = require('../validators/catalogue.validator');

class CatalogueMiddleware {
    async updateVisibilityForDinamicExceptions(req, res, next) {
        try {
            req.cat = await Validator.updateVisibilityForDinamicExceptions().validateAsync({
                ...req.query,
                ...req.params,
                ...req.body
            });

            next ();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    }
}

module.exports = new CatalogueMiddleware();