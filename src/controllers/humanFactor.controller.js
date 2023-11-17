const alarmCollectorService = require("../services/alarmCollector.service");

class HumanFactorController {
  getRiskAnalytics = async (req, res) => {
    try {
      const data = await alarmCollectorService.getRiskAnalytics(req.risk);

      res.status(200).json({
        status: true,
        message: 'Risk analytics obtained successfully',
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

  getIncidentDetail = async (req, res) => {
    try {
      const data = await alarmCollectorService.getIncidentDetail(req.incident);

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

module.exports = new HumanFactorController();