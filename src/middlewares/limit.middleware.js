const LimitValidator = require('../validators/limit.validator');
const DBService = require('../services/database');
const dbService = new DBService();
// const moment = require('moment');

class LimitMiddleware {
  insertDataUsage = async (req, res, next) => {
    try {
      req.limit = await LimitValidator.insertDataUsage().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  getLimitArr = async (req, res, next) => {
    try {
      req.limit = await LimitValidator.getLimitArr().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  getHistoricalLimit = async (req, res, next) => {
    try {
      const { uniqueId, offset, startTime, endTime } = req.task
      const diff = (endTime - startTime) / 1000;
      const historicalLimit = await dbService.getHistoricalLimit({ vehicles: [uniqueId], offset });

      if (historicalLimit.length <= 0)
        return res.status(403).json({ status: false, message: "The device is not associated with an MDVR.", data: null });

      const secondsLeft = historicalLimit[0].seconds_left;

      if (secondsLeft < diff)
        return res.status(403).json({ status: false, message: "You have reached the monthly limit of downloads allowed for this device. Please wait for the next cut off to continue downloading files.", data: null });


      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  getLiveLimit = async (req, res, next) => {
    try {
      const { uniqueId, offset } = req.media;
      const liveLimit = await dbService.getLiveLimit({ vehicles: [uniqueId], offset });

      if (liveLimit.length <= 0)
        return res.status(403).json({ status: false, message: "The device is not associated with an MDVR.", data: null });

      const secondsLeft = liveLimit[0].seconds_left;

      if (secondsLeft <= 0)
        return res.status(403).json({ status: false, message: "You have reached the monthly live viewing limit allowed for this device. Please wait for the next cut to continue watching live.", data: null });

      req.media.secondsLeft = secondsLeft;
      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  configDataUsage = async (req, res, next) => {
    try {
      req.limit = await LimitValidator.configDataUsage().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  getConfigDataUsage = async (req, res, next) => {
    try {
      req.limit = await LimitValidator.getConfigDataUsage().validateAsync({
        ...req.body,
        ...req.query,
        ...req.params
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

}

module.exports = new LimitMiddleware();