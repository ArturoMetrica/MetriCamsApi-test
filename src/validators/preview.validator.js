const Joi = require('joi')

class PreviewValidator {
	get() {
		return Joi.object()
			.keys({
				serial: Joi.string().required(),
				date: Joi.string().required(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	getFT() {
		return Joi.object()
			.keys({
				alarmId: Joi.number().required(),
				channels: Joi.string().required(),
				token: Joi.string().required(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	video() {
		return Joi.object()
			.keys({
				serial: Joi.string().required(),
				date: Joi.date().raw().required(),
				alarmType: Joi.array().items(Joi.number()).optional().default([]),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	uploadGeotabEvidence() {
		return Joi.object().keys({
			geotabAlarms: Joi.array().items(
				Joi.object().keys({
					idGeotabAlarm: Joi.number().required(),
					taskId: Joi.number().required(),
					date: Joi.date().required(),
					serialMdvr: Joi.string().required(),
					cameras: Joi.array().items(Joi.object()).required()
				})
			).required()
		})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	uploadStreamaxEvidence() {
		return Joi.object().keys({
			streamaxAlarms: Joi.array().items(
				Joi.object().keys({
					idAlarm: Joi.number().required(),
					taskId: Joi.number().required(),
					date: Joi.date().required(),
					serialMdvr: Joi.string().required(),
					cameras: Joi.array().items(Joi.object()).required()
				})
			).required()
		})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	uploadEvidence() {
		return Joi.object().keys({
			evidence: Joi.array().items(
				Joi.object().keys({
					idGeotabAlarm: Joi.number().optional().default(null),
					idAlarm: Joi.number().optional().default(null),
					idVehicle: Joi.number().required(),
					serialMdvr: Joi.string().required(),
					chnl: Joi.number().required(),
					downloadId: Joi.string().required(),
				})
			).required()
		})
			.options({ allowUnknown: true, stripUnknown: true })
	}
}

module.exports = new PreviewValidator()

/********************* Propiedad de Métrica Móvil SA de CV **************************/