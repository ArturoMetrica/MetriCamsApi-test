const Joi = require('joi');

class HumanFactorValidator {
  baseObj = {
    vehicles: Joi.array().items(
      Joi.string().optional()
    ).required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    rowNumber: Joi.number().optional().default(0),
    limit: Joi.number().optional().default(10)
  }

  getRiskAnalytics = () => {
    return Joi.object().keys({
      ...this.baseObj
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getIncidentDetail = () => {
    return Joi.object().keys({
      ...this.baseObj
    }).options({ allowUnknown: true, stripUnknown: true });
  }

}

module.exports = new HumanFactorValidator();