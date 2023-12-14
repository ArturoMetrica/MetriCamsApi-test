const Joi = require('joi');
const _ = require('lodash');

const arrayOfNumbers = Joi.string()
  .regex(new RegExp(/\d+(\s*\,\s*\d+)*/))
  .custom((doc) => doc.split(',').map((e) => Number(e)))

const tryArrayOfNumbers = Joi.alternatives().try(
  arrayOfNumbers,
  Joi.array().items(Joi.number())
)
class FTAPIValidator {
  sessionId() {
    return Joi.object().keys({
      sessionid: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  addListDevices() {
    return Joi.object().keys({
      list: Joi.array().items(
        Joi.object().keys({
          token: Joi.string().optional(),
          channels: Joi.string().required(),
          uniqueId: Joi.string().required(),
        })
      ).required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  editDevice() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      channels: Joi.string().required(),
      uniqueId: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getListDevices() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      onlineState: Joi.number().optional(),
      uniqueIds: Joi.string().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getDeviceOnlineRecords() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      startTime: Joi.number().required(),
      endTime: Joi.number().required(),
      uniqueIds: Joi.string().required(),
      page: Joi.number().optional(),
      pageSize: Joi.number().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteDevice() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      uniqueId: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getSimCardImsi() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      uniqueId: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getLatestGpsRecord() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      uniqueIds: Joi.string().optional(),
      vehicleIds: Joi.string().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getQueryGpsRecords() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      startTime: Joi.number().required(),
      endTime: Joi.number().required(),
      uniqueIds: Joi.string().required(),
      page: Joi.number().optional(),
      pageSize: Joi.number().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getAlarmInformation() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      before: Joi.number().optional(),
      processStatus: Joi.number().optional(),
      uniqueIds: Joi.string().optional(),
      page: Joi.number().optional(),
      pageSize: Joi.number().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  alarmProcession() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      alarmIds: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  createAlarmFilesDownloadTask() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      after: Joi.number().required(),
      alarmId: Joi.string().required(),
      before: Joi.number().required(),
      channels: Joi.string().required(),
      fileTypes: Joi.string().required(),
      streamType: Joi.number().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  createFileDownloadTask() {
    return Joi.object().keys({
      token: Joi.string().allow('').optional(),
      endTime: Joi.number().required(),
      uniqueId: Joi.string().required(),
      startTime: Joi.number().required(),
      channels: Joi.string().required(),
      fileTypes: Joi.string().required(),
      streamType: Joi.number().required(),
      offset: Joi.number().optional().default(-6)
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getQueryTaskDownloadStatus() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      taskIds: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getQueryDownloadTaskDetail() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      taskIds: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getFileDownloadLink() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      taskIds: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteFileDownloadLink() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      taskIds: Joi.string().required(),
      deleteFiles: Joi.boolean().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteFile() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      fields: Joi.string().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getDeviceLiveViewUrl() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      user: Joi.string().required(),
      channels: Joi.string().required(),
      uniqueId: Joi.string().required(),
      audio: Joi.number().optional().default(1),
      quality: Joi.number().optional().default(3),
      streamType: Joi.number().optional().default(2),
      mediaType: Joi.number().optional().default(1),
      offset: Joi.number().optional().default(-6)
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  queryStreamingVideoLink() {
    return Joi.object().keys({
      uniqueId: Joi.string().required(),
      channels: Joi.string().required(),
      audio: Joi.string().optional().default('ON').valid('OFF', 'ON'),
      quality: Joi.string().optional().default('SMOOTH').valid('SMOOTH', 'STANDARD', 'CLEAR'),
      streamType: Joi.string().optional().default('MAIN_STREAM').valid('MAIN_STREAM', 'SUB_STREAM'),
      streamingProtocol: Joi.string().optional().default('FLV').valid('FLV', 'HLS'),   
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getTheMaintenancePlatformLink() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      timeZone: Joi.number().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getInquireMonthlyCalendar() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      uniqueId: Joi.string().required(),
      streamType: Joi.number().optional(),
      month: Joi.string().optional(),
      storageType: Joi.number().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getInquireCalendar() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      uniqueId: Joi.string().required(),
      streamType: Joi.number().optional(),
      channels: Joi.string().required(),
      day: Joi.string().optional(),
      storageType: Joi.number().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  subscription() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      type: Joi.number().required(),
      retention: Joi.number().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  cancelSubscription() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      type: Joi.number().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getRealtimeGps() {
    return Joi.object().keys({
      token: Joi.string().optional(),
      size: Joi.number().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getRealtimeAlarm() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      size: Joi.number().optional(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  ttsIssue() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      message: Joi.string().required(),
      uniqueIds: Joi.string().required()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getTtsIssueResultQuery() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      startTime: Joi.number().optional(),
      endTime: Joi.number().optional(),
      page: Joi.number().optional(),
      pageSize: Joi.number().optional(),
      uniqueIds: Joi.string().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  faceParameterConfig() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      uniqueIds: Joi.string().required(),
      snapCondition: Joi.string().optional(),
      intervalTime: Joi.number().optional(),
      threshold: Joi.number().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getFaceComparisonParameter() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      startTime: Joi.number().optional(),
      endTime: Joi.number().optional(),
      page: Joi.number().optional(),
      pageSize: Joi.number().optional(),
      uniqueIds: Joi.string().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getComparisonResult() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      startTime: Joi.number().optional(),
      endTime: Joi.number().optional(),
      page: Joi.number().optional(),
      pageSize: Joi.number().optional(),
      result: Joi.number().optional(),
      uniqueIds: Joi.string().optional()
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  addIssueFacePhoto() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().optional().allow('').default(null),
      employeeNumber: Joi.string()
        .regex(new RegExp(/[A-Za-z0-9]*/))
        .optional()
        .allow('')
        .default(null),
      license: Joi.string()
        .regex(new RegExp(/[A-Za-z0-9]*/))
        .optional()
        .allow('')
        .default(null),
      phone: Joi.string().optional().allow('').default(''),
      groups: tryArrayOfNumbers.allow(null).default(null),
      vehicles: tryArrayOfNumbers.optional(),
      geotabId: Joi.string().optional().allow('').allow(null).default(null),
      uniqueIds: Joi.string().required(),
      faces: Joi.array()
        .items(
          Joi.object().keys({
            faceId: Joi.string()
              .regex(new RegExp(/[A-Za-z0-9]*/))
              .required(),
            path: Joi.string().required(),
          })
        )
        .optional()
        .default([]),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  deleteIssueFacePhoto() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      uniqueIds: Joi.string().required(),
      faceList: Joi.array().items(
        Joi.object().keys({
          faceId: Joi.string().required(),
          faceUrl: Joi.string().required(),
        })
      ).required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getIssueResult() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      taskId: Joi.number().required(),
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getMonthlyCalendar() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      uniqueId: Joi.string().required(),
      streamType: Joi.number().optional().default(1),
      month: Joi.string().required(),
      storageType: Joi.number().optional().default(0),
      timeZoneOffset: Joi.number().optional().default(0)
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getDailyCalendar() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      uniqueId: Joi.string().required(),
      streamType: Joi.number().optional().default(1),
      channels: Joi.string().optional(),
      day: Joi.string().optional(),
      storageType: Joi.number().optional().default(0),
      timeZoneOffset: Joi.number().optional().default(0)
    }).options({ allowUnknown: true, stripUnknown: true });
  }

  getMinuteCalendar() {
    return Joi.object().keys({
      // token: Joi.string().optional(),
      uniqueId: Joi.string().required(),
      streamType: Joi.number().optional().default(1),
      channels: Joi.string().optional(),
      startTime: Joi.number().required(),
      endTime: Joi.number().required(),
      storageType: Joi.number().optional().default(0)
    }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new FTAPIValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/