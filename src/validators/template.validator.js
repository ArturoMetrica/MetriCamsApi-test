const Joi = require('joi')

class TemplateValidator {
	get() {
		return Joi.object()
			.keys({ sessionid: Joi.string(), name: Joi.string() })
			.options({ allowUnknown: true, stripUnknown: true })
	}
	create() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				id: Joi.string().required(),
				name: Joi.string().required(),
				filename: Joi.string().required(),
				groups: Joi.array()
					.items(Joi.number())
					.custom((doc) => JSON.stringify(doc))
					.required(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}
	update() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				id: Joi.string().required(),
				name: Joi.string().required(),
				filename: Joi.string().required(),
				groups: Joi.array()
					.items(Joi.number())
					.custom((doc) => JSON.stringify(doc))
					.required(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}
	delete() {
		return Joi.object()
			.keys({ sessionid: Joi.string().required(), id: Joi.string().required() })
			.options({ allowUnknown: true, stripUnknown: true })
	}
}

module.exports = new TemplateValidator()

/********************* Propiedad de Métrica Móvil SA de CV **************************/