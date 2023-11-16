const Joi = require('joi');
const { server: { apiKeyName, apiKeyValue } } = require('../config/env');

class SecurityValidator {
  verifyApiKey = () => {
    const securitySchema = {
      [apiKeyName]: Joi.string().valid(apiKeyValue).required()
    };

    return Joi.object(securitySchema).options({ allowUnknown: true, stripUnknown: true });
  };
}

module.exports = new SecurityValidator();
