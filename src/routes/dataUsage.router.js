const express = require('express');

const DataUsageController = require('../controllers/dataUsage.controller');
const DataUsageMiddleware = require('../middlewares/dataUsage.middleware');

const routes = express();

routes.get('/api/data/usage', DataUsageMiddleware.getDataUsage, DataUsageController.getDataUsage);

module.exports = routes;