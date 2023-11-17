const alarmCollectorService = require("../services/alarmCollector.service");
const diagnosticAlarmService = require("../services/diagnosticAlarm.service");

class Controller {
  getDiagnosticAlarmName = async (req, res) => {
    try {
      const data = await diagnosticAlarmService.getDiagnosticAlarmName(req.sessionid.sessionid);

      res.status(200).json({
        status: true,
        message: 'Diagnostic alarm names successfully obtained',
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

  getDiagnosticAlarm = async (req, res) => {
    try {
      const data = await alarmCollectorService.getDiagnosticAlarm(req.diagnosticAlarm);

      res.status(200).json({
        status: true,
        message: 'Diagnostic alarms successfully obtained',
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