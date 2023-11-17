const router = require('express').Router();
const SurfsightMiddleware = require('../middlewares/surfsight.middleware');
const SurfsightController = require('../controllers/surfsight.controller');

router.post('/api/surfsight/login', SurfsightController.login);

router.post('/api/surfsight/devices', SurfsightMiddleware.token, SurfsightMiddleware.addMultipleDevices, SurfsightController.addMultipleDevices);
router.post('/api/surfsight/device', SurfsightMiddleware.token, SurfsightMiddleware.addDevice, SurfsightController.addDevice);
router.get('/api/surfsight/device/cameras/active', SurfsightMiddleware.token, SurfsightMiddleware.getActiveCameras, SurfsightController.getActiveCameras);
router.get('/api/surfsight/device/data-usage', SurfsightMiddleware.token, SurfsightMiddleware.deviceDataUsage, SurfsightController.deviceDataUsage);
router.post('/api/surfsight/devices/data-usage', SurfsightMiddleware.token, SurfsightMiddleware.devicesDataUsage, SurfsightController.devicesDataUsage);
router.get('/api/surfsight/snapshots', SurfsightMiddleware.token, SurfsightMiddleware.cameraSnapshot, SurfsightController.cameraSnapshot);
router.get('/api/surfsight/record', SurfsightMiddleware.token, SurfsightMiddleware.selectRecording, SurfsightController.selectRecording);
// Routes to get and download event files
router.get('/api/surfsight/event/files', SurfsightMiddleware.token, SurfsightMiddleware.getListOfAvaiableEventsMediaFiles, SurfsightController.getListOfAvaiableEventsMediaFiles);
router.get('/api/surfsight/download/event', SurfsightMiddleware.token, SurfsightMiddleware.downloadEvent, SurfsightController.downloadEvent);
// Create and download an virtual event
router.post('/api/surfsight/virtual/event', SurfsightMiddleware.token, SurfsightMiddleware.createVirtualEvent, SurfsightController.createVirtualEvent);
router.get('/api/surfsight/virtual/event/details', SurfsightMiddleware.token, SurfsightMiddleware.createVirtualEvent, SurfsightController.createVirtualEvent);

router.get('/api/surfsight/streaming', SurfsightMiddleware.token, SurfsightMiddleware.streaming, SurfsightController.streaming);
router.get('/api/surfsight/calendar', SurfsightMiddleware.token, SurfsightMiddleware.calendar, SurfsightController.calendar);
router.get('/api/surfsight/recording', SurfsightMiddleware.token, SurfsightMiddleware.recording, SurfsightController.recording);
module.exports = router;