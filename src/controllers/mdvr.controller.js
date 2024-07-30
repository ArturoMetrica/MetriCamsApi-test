const mdvrService = require('../services/mdvr.service');
const DBService = require('../services/database');
const dbService = new DBService();
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const { apiKeyName, apiKeyValue, baseURL, getLastPositionURL } = require('../config/env').alarmCollector;

class mdvrController {
  login = async (req, res) => {
    try {
      const { d } = req.credentials
      const { token } = await mdvrService.login(d);

      res.status(200).json({
        status: true,
        message: 'Session started successfully',
        data: token,
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/mdvr/login');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      })
    }
  }

  getMdvrOffset = async (req, res) => {
    try {
      const { mdvrArr, token } = req.mdvr
      const { data } = await mdvrService.getMdvrOffset(token, mdvrArr);

      res.status(200).json({
        status: true,
        message: 'MDVR offset time obtained successfully',
        data,
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/mdvr/offset');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      })
    }
  }

  getMdvrPerClient = async (req, res) => {
    try {
      const data = await dbService.getMdvrPerClient();

      res.status(200).json(data);
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/mdvr/perclient');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      })
    }
  }

  getLastPosition = async (req, res) => {
    try {
      const { mdvrArr, startTime, endTime, last } = req.mdvr;

      const headers = {};
			headers[apiKeyName] = apiKeyValue;
      const { data } = await axios.put(baseURL + getLastPositionURL, { mdvrArr, startTime, endTime, last }, { headers });

      res.status(200).json({
        status: true,
        message: 'Session started successfully',
        data: data.data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/mdvr/last-position');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      })
    }
  }
}

module.exports = new mdvrController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/