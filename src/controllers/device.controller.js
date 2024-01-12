const deviceService = require("../services/device.service");
const DBService = require('../services/database');
const { errorLogs } = new DBService();

class Controller {
  addDevice = async (req, res) => {
    try {
      await deviceService.addDevice(req.sessionid.sessionid, req.device);

      res.status(200).json({
        status: true,
        message: '',
        data
      });
    } catch (error) {
      await errorLogs('API', error, '/api/device');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}

module.exports = new Controller();