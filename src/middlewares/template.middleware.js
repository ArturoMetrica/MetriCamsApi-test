const TemplateValidator = require('../validators/template.validator')

class TemplateMiddleware {
	async get(req, res, next) {
		try {
			req.template = await TemplateValidator.get().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			res.status(400).send('Los parámetros proporcionados no son correctos')
		}
	}

	async create(req, res, next) {
		try {
			req.template = await TemplateValidator.create().validateAsync({
        ...req.query,
        ...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			res.status(400).send('Los parámetros proporcionados no son correctos')
		}
	}

	async update(req, res, next) {
		try {
			req.template = await TemplateValidator.update().validateAsync({
				...req.query,
        ...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			res.status(400).send('Los parámetros proporcionados no son correctos')
		}
	}

	async delete(req, res, next) {
		try {
			req.template = await TemplateValidator.delete().validateAsync({
				...req.query,
        ...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			res.status(400).send('Los parámetros proporcionados no son correctos')
		}
	}
}

module.exports = new TemplateMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/