const router = require('express').Router();
const GeotabController = require('../controllers/geotab.controller');
const GeotabRuleMiddleware = require('../middlewares/geotabRules.middleware');
const Token = require('../middlewares/token.middleware');

router.post(
    '/api/geotab-rule',
    Token.verify,
    GeotabRuleMiddleware.create,
    GeotabController.create);

router.put(
    '/api/geotab-rule',
    Token.verify,
    GeotabRuleMiddleware.update,
    GeotabController.update);

router.delete(
    '/api/geotab-rule',
    Token.verify,
    GeotabRuleMiddleware.delete,
    GeotabController.delete);

router.get(
    '/api/geotab-rule',
    Token.verify,
    GeotabController.get);

router.get(
    '/api/geotab-vehicles',
    Token.verify,
    GeotabRuleMiddleware.getVehicles,
    GeotabController.getVehiclesByGeoRule);

router.post(
    '/api/geotab-alarm',
    Token.verify,
    GeotabRuleMiddleware.createAlarm,
    GeotabController.createAlarm);

router.post(
    '/api/geotab-attended',
    Token.verify,
    GeotabRuleMiddleware.geotabAlarmAttended,
    GeotabController.geotabAlarmAttended);

router.post(
    '/api/geotab-classification-alarm',
    Token.verify,
    GeotabRuleMiddleware.classificationAlarm,
    GeotabController.classificationAlarm);

router.get(
    '/api/classification',
    Token.verify,
    GeotabController.getClassification);

router.get(
    '/api/category',
    Token.verify,
    GeotabController.getCategory);

router.post(
    '/api/verified-alarm',
    Token.verify,
    GeotabRuleMiddleware.verifiedGeotabAlarm,
    GeotabController.verifiedGeotabAlarm);

router.put(
    '/api/classification',
    Token.verify,
    GeotabRuleMiddleware.updateClassification,
    GeotabController.updateClassification);

router.put(
    '/api/location-evidences',
    Token.verify,
    GeotabRuleMiddleware.getLocationLinks,
    GeotabController.getLocationLinks);

router.put(
    '/api/alarms',
    Token.verify,
    GeotabRuleMiddleware.getAlarmGeotabStreamax,
    GeotabController.getAlarmGeotabStreamax);

router.post(
    '/api/geotab-calification',
    Token.verify,
    GeotabRuleMiddleware.classificationGeotabByUser,
    GeotabController.classificationGeotabByUser);

router.post(
    '/api/streamax-calification',
    Token.verify,
    GeotabRuleMiddleware.classificationStreamaxByUser,
    GeotabController.classificationStreamaxByUser);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/