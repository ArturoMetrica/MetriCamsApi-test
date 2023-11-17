const DBService = require('../services/database');
const dbService = new DBService();


class LimitController {
  historicalDataUsage = async (req, res) => {
    try {
      const data = await dbService.historicalDataUsage(req.limit);

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

  getHistoricalLimitArr = async (req, res) => {
    try {
      const data = await dbService.getHistoricalLimit(req.limit);

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

  liveDataUsage = async (req, res) => {
    try {
      const data = await dbService.liveDataUsage(req.limit);

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

  getLiveLimitArr = async (req, res) => {
    try {
      const data = await dbService.getLiveLimit(req.limit);

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

  configDataUsage = async (req, res) => {
    try {
      const { id, config } = req.limit;

      await dbService.configDataUsage(id, true, config.data, config.MB, null, null);

      res.status(200).json({
        status: true,
        message: '',
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

  getConfigDataUsage = async (req, res) => {
    try {
      const { id } = req.limit;

      const { data } = await dbService.configDataUsage(id, false, null, null, null, null);

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

module.exports = new LimitController();