const Joi = require('joi');

class LiveValidator {
  getLiveLink() {
    return Joi.object()
      .keys({
        sessionid: Joi.string().required(),
        token: Joi.string().required(),
        channels: Joi.string().required(),
        uniqueId: Joi.string().required(),
        audio: Joi.number().optional().default(null),
        quality: Joi.number().optional().default(null),
        streamType: Joi.number().optional().default(null),
        mediaType: Joi.number().optional().default(null),
      })
      .options({ allowUnknown: true, stripUnknown: true })
  }
}

module.exports = new LiveValidator()

/********************* Propiedad de Métrica Móvil SA de CV **************************/