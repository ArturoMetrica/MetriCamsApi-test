const alarmCollectorService = require("../services/alarmCollector.service");
const humanFactorService = require('../services/humanFactor.service');

class HumanFactorController {
  getRiskAnalytics = async (req, res) => {
    try {
      const data = await humanFactorService.getRiskAnalytics(req.analytics);

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