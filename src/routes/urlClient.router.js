const router = require('express').Router();
const Controller = require('../controllers/urlClient.controller');

router.get('/api/evidence-service', Controller.evidenceService);

module.exports = router;