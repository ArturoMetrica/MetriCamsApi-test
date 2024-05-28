const alarmCollectorService = require("../services/alarmCollector.service");
const diagnosticAlarmService = require("../services/diagnosticAlarm.service");
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const { baseURL, apiKeyName, apiKeyValue } = require('../config/env').alarmCollector;

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

  getDeviceHealthStartEndDatetime = async (req, res) => {
    try {
      const { fromDate, toDate, serials, alarmCode } = req.diagnosticAlarm;
      
      const { data } = await axios.post(baseURL + '/device-health',
          {
            fromDate,
            toDate,
            serials,
            alarmCode
        },{
          headers: {
            [apiKeyName]: apiKeyValue
          }
        });

      res.status(200).json({
        status: true,
        message: 'Diagnostic alarms successfully obtained',
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