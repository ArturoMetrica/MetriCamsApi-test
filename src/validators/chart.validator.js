const Joi = require('joi')
const { join } = require('lodash')

function getOneItemListOrNull(doc, _type) {
	if (Number(doc)) return [_type(doc)]
	return null
}

const stringArr = Joi.string().custom((doc) =>
	doc.includes(',')
		? doc.split(',').map((i) => parseInt(i))
		: getOneItemListOrNull(doc, Number)
)

const stringArrStr = Joi.string().custom((doc) => {
	if (!doc) return []
	if (typeof doc === 'string' && doc.includes('[')) return JSON.parse(doc)
	if (typeof doc === 'string' && doc.includes(',')) return doc.split(',')
	if (typeof doc === 'object' && Array.isArray(doc)) return doc
	return getOneItemListOrNull(doc, String)
})

class ChartValidator {
	getData() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				vehicles: stringArr.required(),
				starttime: Joi.date().raw().required(),
				endtime: Joi.date().raw().required(),
				rules: stringArr.required(),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}

	simChart() {
		return Joi.object()
			.keys({
				sessionid: Joi.string().required(),
				vehicleIds: Joi.array().items(Joi.number()).allow(null).default(null),
				phoneNumbers: stringArrStr.default(null),
			})
			.options({ allowUnknown: true, stripUnknown: true })
	}
}

module.exports = new ChartValidator()

/********************* Propiedad de Métrica Móvil SA de CV **************************/