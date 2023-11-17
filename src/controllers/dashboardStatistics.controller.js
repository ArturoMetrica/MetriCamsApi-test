const DBService = require('../services/database');
const dbService = new DBService();

const getStatistics = async (sessionid, startTime, endTime, offset) => {
  try {
    const [topDriver, resume] = await Promise.all([
      dbService.getTopDriver(sessionid, startTime, endTime, offset),
      dbService.getResume(sessionid, startTime, endTime, offset),
    ]);
    return {
      topDriver,
      resume,
    };
  } catch (error) {
    throw error.message || error;
  }
}
class Controller {
  getStatistics = async (req, res) => {
    try {
      const { startTime, endTime, offset } = req.statistics; const { sessionid } = req.sessionid;

      const data = await getStatistics(sessionid, startTime, endTime, offset);

      res.status(200).json({
        status: true,
        message: '',
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/dashboard-statistics');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getZoomAlerts = async (req, res) => {
    try {
      const { driver, startDate, endDate, offset } = req.zoom; const { sessionid } = req.sessionid;

      const data = await dbService.getZoomAlerts(sessionid, driver, startDate, endDate, offset);

      res.status(200).json({
        status: true,
        message: '',
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/zoom-drivers');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

}

module.exports = new Controller();