const DBService = require('../services/database');
const dbService = new DBService();
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const { baseURL, getDashboardAnalytics, apiKeyName, apiKeyValue } = require('../config/env').alarmCollector;

class Controller {
    getVehiclesAndDriversByGroupsLevel = async (req, res) => {
        try {
            const { idFleet, startDate, endDate } = req.analytics; const { sessionid } = req.sessionid;
      
            const data_ = await dbService.getVehiclesAndDriversByGroupsLevel(sessionid, idFleet);

            const serials = [].concat(
                ...data_.vehicle_data.map(objeto =>
                  objeto.vehicles.map(vehicle => vehicle.serial)
                )
              );

              const headers = {};
              headers[apiKeyName] = apiKeyValue;
        
              const { data } = await axios.post(baseURL + getDashboardAnalytics,
                {
                  startDate,
                  endDate,
                  vehicles: serials
                },
                {
                  headers
                });
              
      
            res.status(200).json({
              status: true,
              message: '',
              data
            });
          } catch (error) {
            await dbService.errorLogs('API', error, '/api/dashboard-statistics');
      
            res.status(500).json({
              status: false,
              message: error.message || error,
              data: null
            });
          }
    }
}

module.exports = new Controller();