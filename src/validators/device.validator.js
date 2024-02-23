const Joi = require('joi');

class DeviceValidator {
	addDevice = () => {
		return Joi.object().keys({
			action: Joi.number().optional().valid(1).default(1),
			vehicleId: Joi.string().required(),
			deviceData: Joi.object().keys({
				deviceType: Joi.string().valid('GO', 'MDVR', 'LYTX').required(),
				deviceSerial: Joi.string().optional(),
				deviceModel: Joi.string().optional(),
				deviceImei: Joi.string().optional(),
				deviceSim: Joi.string().optional()
			}).required(),
			cameras: Joi.array().optional(),
			streamaxFleetId: Joi.string().optional()
		}).options({ allowUnknown: true, stripUnknown: true });
	}

	updateDevice = () => {
		return Joi.object().keys({
			action: Joi.number().optional().valid(2).default(2),
			vehicleId: Joi.string().required(),
			deviceData: Joi.object().keys({
				deviceType: Joi.string().valid('GO', 'MDVR', 'LYTX').required(),
				deviceSerial: Joi.string().optional(),
				deviceModel: Joi.string().optional(),
				deviceImei: Joi.string().optional(),
				deviceSim: Joi.string().optional()
			}).required(),
			cameras: Joi.array().optional(),
			streamaxFleetId: Joi.string().optional()
		}).options({ allowUnknown: true, stripUnknown: true });
	}

	deleteDevice = () => {
		return Joi.object().keys({
			action: Joi.number().optional().valid(3).default(3),
			vehicleId: Joi.string().required(),
			deviceData: Joi.object().keys({
				deviceType: Joi.string().valid('GO', 'MDVR', 'LYTX').required(),
				deviceSerial: Joi.string().optional(),
				deviceModel: Joi.string().optional(),
				deviceImei: Joi.string().optional(),
				deviceSim: Joi.string().optional()
			}).required(),
			cameras: Joi.array().optional(),
			streamaxFleetId: Joi.string().optional()
		}).options({ allowUnknown: true, stripUnknown: true });
	}

}

module.exports = new DeviceValidator();