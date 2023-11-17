const router = require('express').Router();
const middleware = require('../middlewares/evidence.middleware');
const controller = require('../controllers/evidence.controller');
const FTAPIMiddleware = require('../middlewares/FT_API.middleware');
const FTAPIController = require('../controllers/FT_API.controller');

router.post('/api/upload-evidence', middleware.uploadEvidence, controller.uploadEvidence);
router.delete('/api/video/download/task', middleware.deleteEvidence, FTAPIMiddleware.deleteFileDownloadLink, controller.deleteEvidence);
router.post('/api/evidence-count', middleware.evidenceCount, controller.evidenceCount);

module.exports = router;

