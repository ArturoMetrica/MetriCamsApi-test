const router = require('express').Router();
const FTAPIController = require('../controllers/FT_API.controller');
const FTAPIMiddleware = require('../middlewares/FT_API.middleware');
const { getHistoricalLimit, getLiveLimit } = require('../middlewares/limit.middleware');

router.post('/api/ftapi/login', FTAPIMiddleware.sessionId, FTAPIController.login);

router.post(
  '/api/ftapi/devices',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.addListDevices,
  FTAPIController.addListDevices
);
router.put('/api/ftapi/device', FTAPIMiddleware.sessionId, FTAPIMiddleware.editDevice, FTAPIController.editDevice);
router.get(
  '/api/ftapi/devices',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getListDevices,
  FTAPIController.getListDevices
);
router.get(
  '/api/ftapi/device-online-records',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getDeviceOnlineRecords,
  FTAPIController.getDeviceOnlineRecords
);
router.delete(
  '/api/ftapi/device',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.deleteDevice,
  FTAPIController.deleteDevice
);
router.get(
  '/api/ftapi/simcard',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getSimCardImsi,
  FTAPIController.getSimCardImsi
);

router.get(
  '/api/ftapi/latest-gps-record',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getLatestGpsRecord,
  FTAPIController.getLatestGpsRecord
);
router.get(
  '/api/ftapi/query-gps-records',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getQueryGpsRecords,
  FTAPIController.getQueryGpsRecords
);

router.get(
  '/api/ftapi/alarm',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getAlarmInformation,
  FTAPIController.getAlarmInformation
);
router.put(
  '/api/ftapi/alarm-procession',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.alarmProcession,
  FTAPIController.alarmProcession
);

router.post(
  '/api/ftapi/alarm-files',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.createAlarmFilesDownloadTask,
  FTAPIController.createAlarmFilesDownloadTask
);
router.post(
  '/api/ftapi/file-download-task',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.createFileDownloadTask,
  getHistoricalLimit,
  FTAPIController.createFileDownloadTask
);
router.get(
  '/api/ftapi/task-download-status',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getQueryTaskDownloadStatus,
  FTAPIController.getQueryTaskDownloadStatus
);
router.get(
  '/api/ftapi/download-task-detail',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getQueryDownloadTaskDetail,
  FTAPIController.getQueryDownloadTaskDetail
);
router.get(
  '/api/ftapi/file-link',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getFileDownloadLink,
  FTAPIController.getFileDownloadLink
);
router.delete(
  '/api/ftapi/file-link',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.deleteFileDownloadLink,
  FTAPIController.deleteFileDownloadLink
);

router.delete(
  '/api/ftapi/file',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.deleteFile,
  FTAPIController.deleteFile
);

router.get(
  '/api/ftapi/live-link',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getDeviceLiveViewUrl,
  getLiveLimit,
  FTAPIController.getDeviceLiveViewUrl
);

router.get(
  '/api/ftapi/maintenance',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getTheMaintenancePlatformLink,
  FTAPIController.getTheMaintenancePlatformLink
);

router.get(
  '/api/ftapi/inquire-monthly-calendar',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getInquireMonthlyCalendar,
  FTAPIController.getInquireMonthlyCalendar
);
router.get(
  '/api/ftapi/inquire-calendar',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getInquireCalendar,
  FTAPIController.getInquireCalendar
);

router.post(
  '/api/ftapi/subscription',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.subscription,
  FTAPIController.subscription
);
router.delete(
  '/api/ftapi/subscription',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.cancelSubscription,
  FTAPIController.cancelSubscription
);
router.get(
  '/api/ftapi/realtime-gps',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getRealtimeGps,
  FTAPIController.getRealtimeGps
);
router.get(
  '/api/ftapi/realtime-alarm',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getRealtimeAlarm,
  FTAPIController.getRealtimeAlarm
);

router.post('/api/ftapi/ttsIssue', FTAPIMiddleware.sessionId, FTAPIMiddleware.ttsIssue, FTAPIController.ttsIssue);
router.get(
  '/api/ftapi/ttsIssue',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getTtsIssueResultQuery,
  FTAPIController.getTtsIssueResultQuery
);

router.put(
  '/api/ftapi/face-comparison',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.faceParameterConfig,
  FTAPIController.faceParameterConfig
);
router.get(
  '/api/ftapi/face-comparison-parameter',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getFaceComparisonParameter,
  FTAPIController.getFaceComparisonParameter
);
router.get(
  '/api/ftapi/comparison-result',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getComparisonResult,
  FTAPIController.getComparisonResult
);
router.post(
  '/api/ftapi/issue-face-photo',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.addIssueFacePhoto,
  FTAPIController.addIssueFacePhoto
);
router.put(
  '/api/ftapi/issue-face-photo',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.deleteIssueFacePhoto,
  FTAPIController.deleteIssueFacePhoto
);
router.get(
  '/api/ftapi/issue-result',
  FTAPIMiddleware.sessionId,
  FTAPIMiddleware.getIssueResult,
  FTAPIController.getIssueResult
);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/