const Joi = require('joi');

class historicalValidator {
	historyStreamingVideo = () => {
		return Joi.object().keys({
			channels: Joi.string().required(),
            endTime: Joi.string().required(),
            startTime: Joi.string().required(),
			serialMdvr: Joi.string().required(),
            storeType: Joi.string().optional().default('MAIN_STORAGE'),
            streamType: Joi.string().optional().default('MAIN_STREAM').valid('MAIN_STREAM', 'SUB_STREAM'),
            streamingProtocol: Joi.string().optional().default('FLV').valid('FLV', 'HLS'),
		}).options({ allowUnknown: true, stripUnknown: true });
	}

	stopDeviceStreaming = () => {
		return Joi.object().keys({
			session: Joi.array().required(),
		}).options({ allowUnknown: true, stripUnknown: true });
	}
}

module.exports = new historicalValidator();