const express = require('express');

const AuditlogController = require('../controllers/auditlog.controller');
const AuditlogMiddleware = require('../middlewares/auditlog.middleware');

const routes = express();

routes.post('/api/auditlog-detailed', AuditlogMiddleware.insertAuditlog, AuditlogController.insertAuditlog);

module.exports = routes;