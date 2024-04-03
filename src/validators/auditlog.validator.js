const Joi = require('joi');

const insertAuditlog = () => {
  return Joi.object().keys({
    module: Joi.string().required(),
    selection: Joi.array().items(Joi.number().required()).optional().allow(null),
    element: Joi.string().required(),
    action: Joi.string().optional().allow(null),
    datetime: Joi.string().required()
  }).options({ allowUnknown: true, stripUnknown: true });
}

module.exports = {
  insertAuditlog
}