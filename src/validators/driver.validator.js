const Joi = require('joi')
const _ = require('lodash')

const arrayOfNumbers = Joi.string()
	.regex(new RegExp(/\d+(\s*\,\s*\d+)*/))
	.custom((doc) => doc.split(',').map((e) => Number(e)))

const tryArrayOfNumbers = Joi.alternatives().try(
	arrayOfNumbers,
	Joi.array().items(Joi.number())
)

class DriverValidator {
	get() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				groups: tryArrayOfNumbers.optional().default([]),
				vehicles: tryArrayOfNumbers.optional().default([]),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	geotabGet() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				isDriver: Joi.boolean().optional().default(null),
				name: Joi.string().optional(),
				geotab: Joi.string()
					.base64()
					.custom((doc) => JSON.parse(Buffer.from(doc, 'base64').toString())),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	getFaces() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				jobStatus: Joi.string()
					.valid('all', 'resign', 'current')
					.default('all'),
				checkStatus: Joi.string()
					.valid('all', 'noUpdated', 'pending', 'approved')
					.default('all'),
				type: Joi.string().valid('all', 'card', 'face').default('all'),
				name: Joi.string().optional().allow(null).default(null),
				employeeNumber: Joi.string().optional().allow(null).default(null),
				find: Joi.string().optional().allow(null).default(null),
				page: Joi.number().default(-1),
				count: Joi.number().default(-1),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	create() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				name: Joi.string().required(),
				lastName: Joi.string().required(),
				email: Joi.string().optional().allow('').default(null),
				employeeNumber: Joi.string()
					.regex(new RegExp(/[A-Za-z0-9]*/))
					.optional()
					.allow('')
					.default(null),
				license: Joi.string()
					.regex(new RegExp(/[A-Za-z0-9]*/))
					.optional()
					.allow('')
					.default(null),
				phone: Joi.string().optional().allow('').default(''),
				groups: tryArrayOfNumbers.allow(null).default(null),
				vehicles: tryArrayOfNumbers.required(),
				geotabId: Joi.string().optional().allow('').allow(null).default(null),
				faces: Joi.array()
					.items(
						Joi.object().keys({
							faceId: Joi.string()
								.regex(new RegExp(/[A-Za-z0-9]*/))
								.required(),
							path: Joi.string().required(),
						})
					)
					.custom((arr) => {
						return _.uniqBy(arr, 'path')
					})
					.optional()
					.default([]),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	update() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				id: Joi.number().required(),
				name: Joi.string().required(),
				lastName: Joi.string().required(),
				email: Joi.string().optional().allow(''),
				employeeNumber: Joi.string()
					.regex(new RegExp(/[A-Za-z0-9]*/))
					.optional()
					.allow('')
					.default(null),
				license: Joi.string()
					.regex(new RegExp(/[A-Za-z0-9]*/))
					.optional()
					.allow('')
					.default(null),
				phone: Joi.string().optional().allow(''),
				groups: tryArrayOfNumbers.allow(null).default(null),
				vehicles: tryArrayOfNumbers.required(),
				geotabId: Joi.string().optional().allow('').allow(null).default(null),
				faces: Joi.array()
					.items(
						Joi.object().keys({
							faceId: Joi.string()
								.regex(new RegExp(/[A-Za-z0-9]*/))
								.required(),
							path: Joi.string().required(),
						})
					)
					.custom((arr) => {
						return _.uniqBy(arr, 'path')
					})
					.optional()
					.default([]),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	updateCeibaFace() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				checkStatus: Joi.number().optional().default(null),
				employeeNumber: Joi.string()
					.regex(new RegExp(/[A-Za-z0-9]*/))
					.optional()
					.default(null),
				face: Joi.object().keys({
					faceId: Joi.string()
						.regex(new RegExp(/[A-Za-z0-9]*/))
						.required(),
					path: Joi.string().required(),
				}),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	delete() {
		return Joi.object()
			.keys({ sessionid: Joi.string().required(), id: Joi.number().required() })
			.options({ allowUnknown: true, stripUnknown: true })
	}

	deleteCeibaFace() {
		return Joi.object().keys({
			sessionid: Joi.string().required(),
			faceId: Joi.string()
				.regex(new RegExp(/[A-Za-z0-9]*/))
				.required(),
		})
	}

	getFTAPIUFaces() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				token: Joi.string().required(),
				startTime: Joi.number().optional().default(null),
				endTime: Joi.number().optional().default(null),
				page: Joi.number().optional().default(null),
				pageSize: Joi.number().optional().default(null),
				result: Joi.number().optional().default(null),
				uniqueIds: Joi.string().optional().default(null),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}
}

module.exports = new DriverValidator()

/********************* Propiedad de Métrica Móvil SA de CV **************************/