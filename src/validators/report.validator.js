const Joi = require('joi')

class ReportsValidator {
	get() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				id: Joi.number().optional(),
				name: Joi.string().optional(),
				userId: Joi.number().optional(),
				periodicityId: Joi.number().optional(),
				periodicityValue: Joi.number().optional(),
				time: Joi.string().optional(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	getVisibility() {
		return Joi.object().keys({
			sessionid: Joi.string().required()
		})
	}

	create() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				name: Joi.string().required(),
				rules: Joi.array().items(Joi.number()).required().custom(doc => JSON.stringify(doc)),
				emails: Joi.array().items(Joi.string()).required().custom(doc => JSON.stringify(doc)),
				groups: Joi.array().items(Joi.number()).required().custom(doc => JSON.stringify(doc)),
				vehicles: Joi.array().items(Joi.number()).required().custom(doc => JSON.stringify(doc)),
				periodicityId: Joi.number().required(),
				periodicityValue: Joi.number().required(),
				time: Joi.string().required(),
				visibilityId: Joi.number().optional().default(1),
				offset: Joi.number().default(-6),
				isSummerTime: Joi.boolean().optional().default(false),
				timezoneId: Joi.number().min(1).optional().allow(null).default(null)
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	update() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				id: Joi.number().required(),
				name: Joi.string().required(),
				rules: Joi.array().items(Joi.number()).required().custom(doc => JSON.stringify(doc)),
				emails: Joi.array().items(Joi.string()).required().custom(doc => JSON.stringify(doc)),
				groups: Joi.array().items(Joi.number()).required().custom(doc => JSON.stringify(doc)),
				vehicles: Joi.array().items(Joi.number()).required().custom(doc => JSON.stringify(doc)),
				periodicityId: Joi.number().required(),
				periodicityValue: Joi.number().required(),
				time: Joi.string().required(),
				visibilityId: Joi.number().optional().default(1),
				offset: Joi.number().default(-6),
				isSummerTime: Joi.boolean().optional().default(false),
				timezoneId: Joi.number().min(1).optional().allow(null).default(null)
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	delete() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				id: Joi.number().required(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	getTimezones() {
		return Joi.object()
			.keys({
				name: Joi.string().allow(null).default(null),
				code: Joi.string().allow(null).default(null),
				offset: Joi.string().allow(null).default(null),
				location: Joi.string().allow(null).default(null),
				languageId: Joi.number().allow(null).default(null),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	getAdvancedReport = () => {
		return Joi.object().keys({
			startTime: Joi.string().required(),
			endTime: Joi.string().required(),
			vehicles: Joi.array().items(Joi.number()).optional().default([]),
			rulesS: Joi.array().items(Joi.number()).optional().default([]),
			rulesG: Joi.array().items(Joi.number()).optional().default([]),
			drivers: Joi.array().items(Joi.string().allow('')).optional().default([]),
			language: Joi.number().required().valid(1, 2).default(1),
			initialDay: Joi.number().optional().max(6).min(0).default(0),
			offset: Joi.number().optional().default(-6),
		}).options({ allowUnknown: true, stripUnknown: true });
	}

	deleteExcel = () => {
		return Joi.object().keys({
			id: Joi.string().required()
		}).options({ allowUnknown: true, stripUnknown: true });
	}

}

module.exports = new ReportsValidator()

/********************* Propiedad de Métrica Móvil SA de CV **************************/