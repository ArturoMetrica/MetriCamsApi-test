const router = require('express').Router();
const Middleware = require('../middlewares/alarmTask.middleware');
const Controller = require('../controllers/alarmTask.controller');

router.get('/api/alarm/taskid', Middleware.getTaskId, Controller.getTaskId);
router.post('/api/alarms/page', Middleware.getAlarmsByUserPagination, Controller.getAlarmsByUserPagination);

module.exports = router;