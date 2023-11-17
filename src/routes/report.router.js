const router = require('express').Router();
const ReportsController = require('../controllers/report.controller');
const ReportsMiddleware = require('../middlewares/report.middleware');

router.get('/api/reports', ReportsMiddleware.get, ReportsController.get);
router.get('/api/reports/visibility', ReportsMiddleware.getVisibility, ReportsController.getVisibility);
router.get('/api/reports/timezones', ReportsMiddleware.getTimezones, ReportsController.getTimezones);
router.post('/api/reports', ReportsMiddleware.create, ReportsController.create);
router.put('/api/reports/:id', ReportsMiddleware.update, ReportsController.update);
router.delete('/api/reports/:id', ReportsMiddleware.delete, ReportsController.delete);
router.put('/api/advanced-report', ReportsMiddleware.getAdvancedReport, ReportsController.getAdvancedReport);

module.exports = router

/********************* Propiedad de Métrica Móvil SA de CV **************************/