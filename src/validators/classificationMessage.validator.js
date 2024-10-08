const Joi = require('joi');

class ClassificationMessageValidator {
	insertClassificationMessage() {
		return Joi.object().keys({
			message: Joi.string().required(),
			groups: Joi.array().required()
		}).options({ allowUnknown: true, stripUnknown: true });
	}

	updateClassificationMessage() {
		return Joi.object().keys({
			id: Joi.number().required(),
			message: Joi.string().required(),
			groups: Joi.array().required()
		}).options({ allowUnknown: true, stripUnknown: true });
	}

	deleteClassificationMessage() {
		return Joi.object().keys({
			classifications: Joi.string().required()
		}).options({ allowUnknown: true, stripUnknown: true });
	}

	classificateAllPages() {
		return Joi.object().keys({
			startTime: Joi.date().required(),
			endTime: Joi.date().required(),
			vehicles: Joi.array().required(),
			rulesG: Joi.array().required(),
			rulesS: Joi.array().required(),
			dataC: Joi.object().keys({
				idClassificationMessage: Joi.number().optional(),
				comment: Joi.string().optional(),
				calification: Joi.boolean().required(),
				ruleName: Joi.string().allow('').optional(),
				ruleId: Joi.number().allow('').optional()
			}).required(),
			offset: Joi.number().default(-6).optional()
		}).options({ allowUnknown: true, stripUnknown: true });
	}
}

module.exports = new ClassificationMessageValidator();