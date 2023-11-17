const CodeGroupValidator = require('../validators/codeGroup.validator')

class CodeGroupMiddleware {
	async get(req, res, next) {
		try {
			req.codeGroup = await CodeGroupValidator.get().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async update(req, res, next) {
		try {
			req.codeGroup = await CodeGroupValidator.update().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async delete(req, res, next) {
		try {
			req.codeGroup = await CodeGroupValidator.delete().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new CodeGroupMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/