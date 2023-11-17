const Joi = require('joi');

const arrayOfNumbers = Joi.string()
  .regex(new RegExp(/\d+(\s*,\s*\d+)*/))
  .custom((doc) => doc.split(',').map((e) => Number(e)));

const tryArrayOfNumbers = Joi.alternatives().try(arrayOfNumbers, Joi.array().items(Joi.number()));

const cameraProp = Joi.array().items(
  Joi.object().keys({
    chl: Joi.number().required(),
    name: Joi.string().required(),
    cameraTypeId: Joi.number().required()
  })
);
const base = {
  idGroup: Joi.number().required(),
  plate: Joi.string().default('').required(),
  vin: Joi.string().allow('').default('-').required(),
  imei: Joi.string().allow('').default('').required(),
  sim: Joi.string().allow('').default('').required(),
  serial: Joi.string().allow('').default('').required(),
  model: Joi.string().allow('').default('').required(),
  name: Joi.string().allow('').default('').required(),
  serialMDVR: Joi.string().allow('').default('').required(),
  comments: Joi.string().allow('').default('').required(),
  cameras: cameraProp,
  geotabDeviceId: Joi.string().allow(null, '').optional().default(''),
  enableRecording: Joi.bool().allow(null).optional().default(null),
  goVin: Joi.string().allow(null).optional(),
  goSerial: Joi.string().allow(null).optional(),
  streamaxFleetId: Joi.string().optional(),
  // token: Joi.string().required(),
};

class VehicleValidator {
  getGroups() {
    return Joi.object().keys({
      sessionid: Joi.string().required(),
      groupIds: tryArrayOfNumbers.optional().default(null)
    });
  }

  sessionid() {
    return Joi.object()
      .keys({
        sessionid: Joi.string().required()
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  get() {
    return this.sessionid();
  }

  create() {
    return Joi.object()
      .keys({
        ...base
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  update() {
    return Joi.object()
      .keys({
        id: Joi.number().required(),
        ...base
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  delete() {
    return Joi.object()
      .keys({
        id: Joi.number().required(),
        serialMDVR: Joi.string().required(),
        // token: Joi.string().required()
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  deleteCameraAccess() {
    return Joi.object()
      .keys({
        access: Joi.array().required()
      })
      .options({ allowUnknown: true, stripUnknown: true });
  }

  getComponentVehicle() {
    return Joi.object().keys({
      sessionid: Joi.string().required(),
      idVehicle: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new VehicleValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/