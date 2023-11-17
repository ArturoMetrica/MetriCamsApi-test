const DBService = require('../services/database');
const dbService = new DBService();
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const { apiKeyName, apiKeyValue, baseURL, getLastPositionURL } = require('../config/env').alarmCollector;


class ClassificationMessageController {
    async getVehiclesData (req, res) {
        try {
            const {  vehicles, langId, offSet } = req.info;
            const { mdvrArr, last, startTime, endTime } = req.body;
            const { sessionid } = req.sessionid;

            const headers = {};
            headers[apiKeyName] = apiKeyValue;
            const { data } = await axios.put(baseURL + getLastPositionURL, { mdvrArr, last, startTime, endTime }, { headers });
            const data_ = await dbService.getVehiclesData(sessionid, vehicles, langId, offSet);
            
            const lastCommunication = data_.reduce((a,b) => ({...a, [b.serial]: b}), {});
            const dataReport = data.data.map(a => ({...lastCommunication[a.serialMdvr], ...a }));

            res.status(200).json({
                status: true,
                message: '',
                data: dataReport
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/watchDog');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }
}

module.exports = new ClassificationMessageController();