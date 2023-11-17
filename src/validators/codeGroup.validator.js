const Joi = require('joi')
const id = { id: Joi.number().positive().required() }

class CodeGroupValidator {
	get() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	update() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				code: Joi.string().required(),
				...id,
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	delete() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				...id,
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}
}

module.exports = new CodeGroupValidator()

/********************* Propiedad de Métrica Móvil SA de CV **************************/