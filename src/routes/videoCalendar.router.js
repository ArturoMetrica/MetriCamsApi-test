const router = require('express').Router();
const videoCalendarController = require('../controllers/videoCalendar.controller');
const FTAPIMiddleware = require('../middlewares/FT_API.middleware');

router.get('/api/month-video-record', FTAPIMiddleware.getMonthlyCalendar, videoCalendarController.getMonthlyVideoRecord);
router.get('/api/daily-video-record', FTAPIMiddleware.getDailyCalendar, videoCalendarController.getDailyVideoRecord);
router.get('/api/minute-video-record', FTAPIMiddleware.getMinuteCalendar, videoCalendarController.getMinuteVideoRecord);

module.exports = router;