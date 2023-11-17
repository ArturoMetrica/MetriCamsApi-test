const express = require('express');

const Controller = require('../controllers/group.controller');
const Middleware = require('../middlewares/group.middleware');

const routes = express();

routes.post('/api/group', Middleware.createGroup, Controller.createGroup);
routes.get('/api/group', Middleware.getGroup, Controller.getGroup);
routes.put('/api/group', Middleware.updateGroup, Controller.updateGroup);
routes.delete('/api/group', Middleware.deleteGroup, Controller.deleteGroup);

module.exports = routes;