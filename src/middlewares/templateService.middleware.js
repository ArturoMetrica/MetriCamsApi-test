const TemplateValidator = require('../validators/templateService.validator');

class TemplateMiddleware {
    addTemplate = async (req, res, next) => {
        try {
            req.template = await TemplateValidator.addTemplate().validateAsync({ ...req.body });

            next ();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    }

    updateTemplate = async (req, res, next) => {
        try {
            req.template = await TemplateValidator.updateTemplate().validateAsync({ ...req.query, ...req.params, ...req.body });

            next ();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    }

    deleteTemplate = async (req, res, next) => {
        try {
            req.template = await TemplateValidator.deleteTemplate().validateAsync({ ...req.query, ...req.params });

            next ();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    }

    getTemplate = async (req, res, next) => {
        try {
            req.template = await TemplateValidator.getTemplate().validateAsync({ ...req.query, ...req.params });

            next ();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    }
}

module.exports = new TemplateMiddleware();