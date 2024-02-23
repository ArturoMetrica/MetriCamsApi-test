const Joi = require('joi');

class DeviceValidator {
	addDevice = () => {
		return Joi.object().keys({
			vehicleId: Joi.string().required(),
			deviceData: Joi.array().items(
				Joi.object().keys({
					deviceType: Joi.number().valid(1, 2, 3).required(),
					deviceSerial: Joi.string().optional(),
					deviceModel: Joi.string().optional(),
					deviceImei: Joi.string().optional(),
					deviceSim: Joi.string().optional(),
					devicePhone: Joi.string().optional()
				})
			).optional(),
			cameras: Joi.array().optional(),
			streamaxFleetId: Joi.string().optional()
		}).options({ allowUnknown: true, stripUnknown: true });
	}

	updateDevice = () => {
		return Joi.object().keys({
			vehicleId: Joi.string().required(),
			deviceData: Joi.array().items(
				Joi.object().keys({
					deviceType: Joi.number().valid(1, 2, 3).required(),
					deviceSerial: Joi.string().required(),
					deviceModel: Joi.string().optional(),
					deviceImei: Joi.string().optional(),
					deviceSim: Joi.string().optional(),
					devicePhone: Joi.string().optional()
				})
			).optional(),
			cameras: Joi.array().optional(),
			streamaxFleetId: Joi.string().optional()
		}).options({ allowUnknown: true, stripUnknown: true });
	}

	deleteDevice = () => {
		return Joi.object().keys({
			vehicleId: Joi.string().required(),
			deviceData: Joi.array().items(
				Joi.object().keys({
					deviceType: Joi.number().valid(1, 2, 3).required(),
					deviceSerial: Joi.string().required(),
				})
			).optional(),
		}).options({ allowUnknown: true, stripUnknown: true });
	}

}

module.exports = new DeviceValidator();