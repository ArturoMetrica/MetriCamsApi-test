const DBService = require('../services/database');
const dbService = new DBService();
const GeotabService = require('../services/geotab.service');
const geotabService = new GeotabService();
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const { apiKeyName, apiKeyValue, baseURL, getLastPositionURL } = require('../config/env').alarmCollector;
const { database } = require('../config/env').geotab;


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
            let dataReport = data.data.map(a => ({...lastCommunication[a.serialMdvr], ...a }));

            const serialsReport = new Set(dataReport.map(objeto => objeto.serial));
            const filterData = data_.filter(objeto => !serialsReport.has(objeto.serial));
            dataReport = dataReport.concat(filterData);

            let goIds = dataReport.filter(info => info.goId !== '').map(info => info.goId);

            if (goIds.length) {
                if (database === 'fleet_mexico') {
                    goIds = goIds.slice(0, 600);
                }
                const deviceStatusInfo = await geotabService.getLastCommunication();
                const filteredInfo = deviceStatusInfo.filter(info => {
                const deviceId = info.device.id; // Asumiendo que el ID está en info.device.id
                return goIds.includes(deviceId);
            });

            for (const info of dataReport) {
                if (info.goId === '') continue;
                const matchingInfo = filteredInfo.find(filteredInfo => filteredInfo.device.id === info.goId);
                if (matchingInfo) {
                    info.latitudeGo = matchingInfo.latitude;
                    info.longitudeGo = matchingInfo.longitude;
                    info.dateTimeGo = matchingInfo.dateTime;
                }
            }
        }

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