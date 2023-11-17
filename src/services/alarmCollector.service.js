const axios = require('axios').default;

const { alarmCollector: { baseURL, apiKeyName, apiKeyValue } } = require('../config/env');

class AlarmCollectorService {
  getDiagnosticAlarm = async ({ startDate, endDate, mdvrArr, alarmCodeArr }) => {
    try {
      const { data } = await axios.post(baseURL + '/diagnostic/alarm', {
        startDate,
        endDate,
        mdvrArr,
        alarmCodeArr
      }, {
        headers: {
          [apiKeyName]: apiKeyValue
        }
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  getRiskAnalytics = async ({ vehicles, startDate, endDate, rowNumber, limit }) => {
    try {
      const { data } = await axios.put(baseURL + '/human-factor/risk-analytics', {
        vehicles,
        startDate,
        endDate,
        rowNumber,
        limit
      }, {
        headers: {
          [apiKeyName]: apiKeyValue
        }
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  getIncidentDetail = async ({ vehicles, startDate, endDate, rowNumber, limit }) => {
    try {
      const { data } = await axios.put(baseURL + '/human-factor/incident-detail', {
        vehicles,
        startDate,
        endDate,
        rowNumber,
        limit
      }, {
        headers: {
          [apiKeyName]: apiKeyValue
        }
      });

      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AlarmCollectorService();