const Joi = require('joi');
const { now } = require('lodash');

class FacialRecValidator {
  getDriver = () => {
    return Joi.object().keys({
      sessionid: Joi.string().required(),
      groups: Joi.array().optional(),
      vehicles: Joi.array().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getSnaps = () => {
    return Joi.object().keys({
      token: Joi.string().required(),
      uniqueIds: Joi.string().optional(),
      startTime: Joi.number().optional(),
      endTime: Joi.number().optional(),
      result: Joi.number().optional(),
      page: Joi.number().optional().min(1).max(100000),
      pageSize: Joi.number().optional().min(1).max(100000)
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getSnapConfig = () => {
    return Joi.object().keys({
      uniqueId: Joi.string().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  createDriverDB = () => {
    return Joi.object().keys({
      // token: Joi.string().required(),
      faceList: Joi.array().items(
        Joi.object().keys({
          faceId: Joi.string().optional(),
          faceUrl: Joi.string().optional()
        })
      ).optional(),
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      groups: Joi.array().required(),
      vehicles: Joi.array().allow('').optional(),
      nss: Joi.string().required(),
      geotabId: Joi.string().allow('').optional(),
      employeeNumber: Joi.string().optional().allow('').default(null),
      birthday: Joi.string().optional().allow(''),
      phone: Joi.string().optional().allow('').default(null),
      license: Joi.string().allow('').optional(),
      email: Joi.string().optional().allow('').default(null),
      profilePicture: Joi.string().allow('').optional(),
      ruleId: Joi.number().required(),
      rule: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  createDriverFT = () => {
    return Joi.object().keys({
      token: Joi.string().required(),
      faceList: Joi.array().items(
        Joi.object().keys({
          faceId: Joi.string().optional(),
          faceUrl: Joi.string().optional()
        })
      ).optional(),
      strategy: Joi.number().default(2).optional(),
      subStrategy: Joi.number().default(1).optional(),
      uniqueIds: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  updateDriverDB = () => {
    return Joi.object().keys({
      // token: Joi.string().required(),
      faceList: Joi.array().items(
        Joi.object().keys({
          faceId: Joi.string().optional(),
          faceUrl: Joi.string().optional()
        })
      ).optional(),
      idDriver: Joi.number().required(),
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      groups: Joi.array().optional(),
      vehicles: Joi.array().allow('[]').optional(),
      nss: Joi.string().required(),
      geotabId: Joi.string().optional(),
      employeeNumber: Joi.string().optional().allow('').default(null),
      birthday: Joi.string().optional().allow(''),
      phone: Joi.string().optional().allow('').default(null),
      license: Joi.string().optional(),
      email: Joi.string().optional().allow('').default(null),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  updateDriverFT = () => {
    return Joi.object().keys({
      token: Joi.string().required(),
      faceList: Joi.array().items(
        Joi.object().keys({
          faceId: Joi.string().optional(),
          faceUrl: Joi.string().optional()
        })
      ).optional(),
      id: Joi.number().required(),
      strategy: Joi.number().default(2).optional(),
      subStrategy: Joi.number().default(1).optional(),
      uniqueIds: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteDriverFT = () => {
    return Joi.object().keys({
      token: Joi.string().required(),
      faceList: Joi.array().items(
        Joi.object().keys({
          faceId: Joi.string().allow(null).optional(),
          faceUrl: Joi.string().allow(null).optional()
        })
      ).optional(),
      strategy: Joi.number().default(2).optional(),
      subStrategy: Joi.number().default(2).optional(),
      uniqueIds: Joi.string().required(),
      idVehicles: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteDriverDB = () => {
    return Joi.object().keys({
      sessionid: Joi.string().required(),
      driverId: Joi.number().required(), 
      ftaDriverId: Joi.string().required(),
      // nss: Joi.string().allow('').optional(),
      // pictures: Joi.array().optional(),
      // faceFileIds: Joi.string().allow('').optional(),
      profilePicture: Joi.string().allow('').optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  snapsConfig = () => {
    return Joi.object().keys({
      token: Joi.string().required(),
      snapCondition: Joi.string().optional(),
      intervalTime: Joi.number().optional().min(60).max(3600),
      threshold: Joi.number().optional().min(1).max(100),
      uniqueIds: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  checkStatus = () => {
    return Joi.object().keys({
      token: Joi.string().required(),
      taskId: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  createDriverFR = () => {
    return Joi.object().keys({
      driverCode: Joi.string().required(),
      driverName: Joi.string().optional(),
      fleetId: Joi.number().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteDriverFR = () => {
    return Joi.object().keys({
      driverIds: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true});
  }

  uploadDriverFace = () => {
    return Joi.object().keys({
      ftaDriverId: Joi.string().required(),
      driverId: Joi.number().required(),
      pictureList: Joi.array().required(),
      pictureQuantity: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteDriverFace = () => {
    return Joi.object().keys({
      ftaDriverId: Joi.string().required(),
      driverId: Joi.number().required(),
      profilePicture: Joi.string().allow('').required()
    }).options({ allowUnknown: true, stripUnknown: true});
  }

  getDriverFaceList = () => {
    return Joi.object().keys({
      ftaDriverIds: Joi.array().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getDriverPage = () => {
    return Joi.object().keys({
      driverCode: Joi.string().optional(),
      ftaDriverIds: Joi.string().optional(),
      driverName: Joi.string().optional(),
      fleetIds: Joi.string().optional(),
      page: Joi.number().optional(),
      pageSize: Joi.number().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getDefaultFaceAuth = () => {
    return Joi.object().keys({
      _sign: Joi.string().required(),
      _tenantid: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  updateFaceAuth = () => {
    return Joi.object().keys({
      bindType: Joi.string().required(),
      fleetIds: Joi.string().optional(),
      uniqueIds: Joi.string().optional(),
      vehicleIds: Joi.string().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getDefaultFaceSett = () => {
    return Joi.object().keys({
      _sign: Joi.string().required(),
      _tenantid: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  updateFaceSetting = () => {
    return Joi.object().keys({
      accSnap: Joi.string().required(),
      captureInterval: Joi.string().optional(),
      leaveCapture: Joi.string().required(),
      strategyName: Joi.string().optional(),
      timedCapture: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  captureRealTime = () => {
    return Joi.object().keys({
      token: Joi.string().optional(),
      channels: Joi.string().required(),
      resolution: Joi.number().required(),
      uniqueId: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true});
  }

}

module.exports = new FacialRecValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/