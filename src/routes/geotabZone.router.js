const router = require('express').Router();
const Controller = require('../controllers/geotabZone.controller');

router.get('/api/zones', Controller.getZones);

module.exports = router;