const router = require('express').Router();
const { Router } = require('express');
const Controller = require('../controllers/facialRecognition.controller');
const Middleware = require('../middlewares/facialRecognition.middleware');
const Token = require('../middlewares/token.middleware');

router.get('/api/facial-recognition/status', Token.verify, Middleware.checkStatus, Controller.checkStatus);
router.get('/api/facial-recognition/snaps', Token.verify, Middleware.getSnaps, Controller.getSnaps);

// NO SE USAN
router.get('/api/facial-recognition/config', Token.verify, Middleware.getSnapConfig, Controller.getSnapConfig);
router.post('/api/facial-recognition/config', Token.verify, Middleware.snapsConfig, Controller.snapsConfig);
router.post('/api/ft/facial-recognitionFT', Token.verify, Middleware.createDriverFT, Controller.createDriverFT); // FT
router.put('/api/ft/facial-recognitionImgFT', Token.verify, Middleware.deleteDriverFT, Controller.deleteDriverFT); // FT
router.put('/api/ft/facial-recognitionFT', Token.verify, Middleware.updateDriverFT, Controller.updateDriverFT); // FT

router.post('/api/ft/facial-recognition/driver', Token.verify, Middleware.createDriverFR, Controller.createDriverFR); // FT new version
router.delete('/api/ft/facial-recognition/driver', Token.verify, Middleware.deleteDriverFR, Controller.deleteDriverFR); // FT new version

router.get('/api/ft/facial-recognition/face/auth', Token.verify, Controller.getDefaultFaceAuth); // FT new version
router.put('/api/ft/facial-recognition/face/auth/config', Token.verify, Middleware.updateFaceAuth, Controller.updateFaceAuth); // FT new version
router.get('/api/ft/facial-recognition/face/setting', Token.verify, Controller.getDefaultFaceSett); // FT new version
router.put('/api/ft/facial-recognition/face/setting/config', Token.verify, Middleware.updateFaceSett, Controller.updateFaceSett); // FT new
router.get('/api/ft/facial-recognition/driver/page', Token.verify, Middleware.getDriverPage, Controller.getDriverPage); // FT new version

// RUTAS PRINCIPALES DE RECONOCIMIENTO FACIAL
router.post('/api/facial-recognition', Token.verify, Middleware.createDriverDB, Controller.createDriverDB); // DB
router.put('/api/facial-recognition', Token.verify, Middleware.updateDriverDB, Controller.updateDriverDB); // DB
router.delete('/api/facial-recognition', Token.verify, Middleware.deleteDriverDB, Controller.deleteDriverDB); // BD
router.post('/api/ft/facial-recognition/driver/face', Token.verify, Middleware.uploadDriverFace, Controller.uploadDriverFace); // Asignar imagenes al conductor en FT API
router.delete('/api/ft/facial-recognition/driver/face-list', Token.verify, Middleware.deleteDriverFace, Controller.deleteDriverFace); // Eliminar rostros en FT API
router.post('/api/ft/facial-recognition/driver/face-list', Token.verify, Middleware.getDriverFaceList, Controller.getDriverFaceList); // Obtener imagenes asignadas al conductor en FT API
router.get('/api/facial-recognition', Token.verify, Middleware.getDriver, Controller.getDriver); // Obtiene todos los condutores
router.get('/api/facial-recognition/driver/pictures', Token.verify, Controller.getDriverPictures); // Obtiene imagen de conductor en bucket

router.post('/api/ft/facial-recognition/capture/realTime', Token.verify, Middleware.captureRealTime, Controller.captureRealTime);

module.exports = router;
