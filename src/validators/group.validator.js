const Joi = require('joi');

class GroupValidator {
  createGroup = () => {
    return Joi.object().keys({
      action: Joi.string().optional().default(1),
      groupName: Joi.string().required(),
      parentFleetId: Joi.number().allow(null).required(),
      parentStreamaxFleetId: Joi.string().optional().default('1349567071612339936'),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getGroup = () => {
    return Joi.object().keys({
      groupName: Joi.string().optional(),
      fleetId: Joi.number().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  updateGroup = () => {
    return Joi.object().keys({
      action: Joi.string().optional().default(2),
      groupName: Joi.string().required(),
      fleetId: Joi.number().required(),
      streamaxFleetId: Joi.string().required(),
      parentFleetId: Joi.number().required(),
      parentStreamaxFleetId: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteGroup = () => {
    return Joi.object().keys({
      action: Joi.string().optional().default(3),
      fleetId: Joi.number().required(),
      streamaxFleetId: Joi.string().required(),
      parentFleetId: Joi.number().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new GroupValidator();