const express = require('express');
const axios = require('axios').default;
const https = require('https');
const moment = require('moment');
const streamaxMiddleware = require('../middlewares/streamaxRules.middleware');
const streamaxController = require('../controllers/streamaxRules.controller');

const { apiKeyName, apiKeyValue, baseURL, getLastPositionURL } = require('../config/env').alarmCollector

const router = express.Router();
const agent = new https.Agent({ rejectUnauthorized: false });
const app = express();


router.post('/lastposition', async (req, res) => {
  try {
    let vehicles = null;
    if (typeof req.body.vehicles === 'undefined')
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    // if (!req.get('token') || req.get('token') === '') throw { message: `Invalid token [${req.get('token')}]` };

    // setToken(req.get('token'));
    const headers = {};
    headers[apiKeyName] = apiKeyValue;
    vehicles = req.body.vehicles;
    const { data } = await axios.put(baseURL + getLastPositionURL, { mdvrArr: vehicles }, { headers });

    const mappedResult = data.data.map((gpsRecord) => {
      const time = moment.utc(gpsRecord.dateTime || new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
      return {
        terid: gpsRecord.serialMdvr || null,
        gpstime: time,
        altitude: 0,
        direction: gpsRecord.angle || 0,
        gpslat: gpsRecord.latitude || 0,
        gpslng: gpsRecord.longitude || 0,
        speed: gpsRecord.speed || 0,
        recordspeed: gpsRecord.speed || 0,
        state: 0,
        time
      };
    });

    res.send({ data: mappedResult });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

router.post('/status', async (req, res) => {
  try {
    if (typeof req.body.vehicles === 'undefined')
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    const uniqueIds = req.body.vehicles;

    const apiURL = `${process.env.FT_API_BASE_URL + process.env.FT_API_GET_LIST_DEVICES_URL}`;
    const ftconfig = { ...config, params: { uniqueIds, onlineState: 1 }, headers: { ...config.headers } };
    const status = [];

    for (let i = 0; i < req.body.vehicles.length; i += 50) {
      const dataSegment = req.body.vehicles.slice(i, i + 50);

      try {
        ftconfig.params.uniqueIds = dataSegment.join(',');
        const response = await axios.get(apiURL, ftconfig);
        status.push(...response.data.data);
      } catch (error) {
        return res.status(500).json(error.message || error);
      }
    }

    if (status.length >= 0) {
      const result = status.map(e => ({ terid: e.uniqueId }));
      return res.status(200).json(result);
    }

    res.status(500).send(null);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

router.post('/streamax-taskId', streamaxMiddleware.insertStreamaxTaskIds, streamaxController.insertStreamaxTaskIds);

app.use('/api', router);
module.exports = app;

/********************* Propiedad de Métrica Móvil SA de CV **************************/