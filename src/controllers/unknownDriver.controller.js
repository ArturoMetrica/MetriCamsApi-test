const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const DBService = require('../services/database');
const dbService = new DBService();

const { baseURL, getUnknownDriverAlarmURL, apiKeyName, apiKeyValue } = require('../config/env').alarmCollector;

class Controller {
  getAlarmsUnknownDriver = async (req, res) => {
    try {
      const { startTime, endTime, serials, alarmType } = req.alarm;

      const headers = {};
      headers[apiKeyName] = apiKeyValue;

      const { data } = await axios.put(baseURL + getUnknownDriverAlarmURL,
        {
          startTime,
          endTime,
          serials,
          alarmType
        },
        {
          headers
        });

      res.status(200).json({
        status: true,
        message: '',
        data: data.data
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