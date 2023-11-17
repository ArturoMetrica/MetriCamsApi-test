const exceptionService = require("../services/exception.service");

class Controller {
  getAttendedAlarmsCount = async (req, res) => {
    try {
      const { deviceIdArr, sRuleArr, gRuleArr, startTime, endTime, offset } = req.exception;
      const data = await exceptionService.getAttendedAlarmsCount(req.sessionid.sessionid, startTime, endTime, deviceIdArr, sRuleArr, gRuleArr, offset);

      res.status(200).json({
        status: true,
        message: '',
        data
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}

module.exports = new Controller();