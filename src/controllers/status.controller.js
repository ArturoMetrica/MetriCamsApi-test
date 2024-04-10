const DBService = require('../services/database');
const handleResponseUtil = require('../utils/handleResponse.util');
const dbService = new DBService();

class Controller {
  status = async (req, res) => {
    try {
      const data = await dbService.getStatus();

      res.status(200).json({
        status: true,
        message: 'Normal',
        data
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Anormal',
        data: null
      });
    }
  }

  killConnections = async (req, res) => {
    try {
      const message = await dbService.killConnections();

      res.status(200).json({
        status: true,
        message: `killed connections: ${message.split(': ')[1]}`,
        data: null
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getAlarmStatusByDate = async (req, res) => {
    try {
      const { fromDate, toDate, minRecords } = req.alarms;
      const serials = await dbService.getDeviceSerial();
      const data = await dbService.getAlarmStatusByDate(serials, fromDate, toDate, minRecords);
      handleResponseUtil(res, 200, true, 'ok', data);
    } catch (error) {
      handleResponseUtil(res, 500, false, error.message || error, null);
    }
  }
}

module.exports = new Controller();