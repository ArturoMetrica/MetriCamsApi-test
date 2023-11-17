const Joi = require('joi')
const stringArr = Joi.array().items(Joi.number()).default([])

class AlarmConfigValidator {
	get() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	create() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				rules: stringArr.optional(),
				vehicles: stringArr.required(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	update() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				rules: stringArr.required(),
				vehicles: stringArr.optional(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	delete() {
		return Joi.object()
			.keys({ sessionid: Joi.string().required() })
			.options({ allowUnknown: true, stripUnknown: true })
	}
}

module.exports = new AlarmConfigValidator()

/********************* Propiedad de Métrica Móvil SA de CV **************************/