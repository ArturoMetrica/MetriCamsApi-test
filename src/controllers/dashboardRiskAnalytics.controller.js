const DBService = require('../services/database');
const dbService = new DBService();
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const { baseURL, getDashboardAnalytics, apiKeyName, apiKeyValue } = require('../config/env').alarmCollector;

class Controller {
    getVehiclesAndDriversByGroupsLevel = async (req, res) => {
      try {
        const { idFleet, startDate, endDate } = req.analytics;
        const { sessionid } = req.sessionid;
        const headers = {};
        headers[apiKeyName] = apiKeyValue;
    
        const data_ = await dbService.getVehiclesAndDriversByGroupsLevel(sessionid, idFleet);
    
        const serials = [].concat(
          ...data_.vehicle_data.map(objeto =>
            objeto.vehicles.map(vehicle => vehicle.serial)
          )
        );
    
        const { data: eventsData } = await axios.post(baseURL + getDashboardAnalytics,
          {
            startDate,
            endDate,
            vehicles: serials
          },
          {
            headers
          });
    
        // Lógica para agrupar eventos por fleet_id, risk_level y contarlos
        const groupedEvents = {};
        eventsData.data.forEach(event => {
          const fleetIdObject = data_.vehicle_data.find(fleet => fleet.vehicles.some(vehicle => vehicle.serial === event.serial_mdvr));
          const fleetId = fleetIdObject ? fleetIdObject.fleet_id : null;

          if (!groupedEvents[fleetId]) {
            groupedEvents[fleetId] = { low: 0, medium: 0, high: 0, vehicles: {} };
          }
    
          if (!groupedEvents[fleetId].vehicles[event.serial_mdvr]) {
            groupedEvents[fleetId].vehicles[event.serial_mdvr] = { low: 0, medium: 0, high: 0 };
          }
    
          // Incrementar el contador según el risk_level
          groupedEvents[fleetId][event.risk_level.toLowerCase()] += 1;
          groupedEvents[fleetId].vehicles[event.serial_mdvr][event.risk_level.toLowerCase()] += 1;
        });
    
        // Construir la respuesta con la estructura deseada
        const resultData = {
          vehicle_data: data_.vehicle_data.map(fleet => {
            const fleetId = fleet.fleet_id;
            return {
              fleet_id: fleetId,
              fleet_name: fleet.fleet_name,
              low: groupedEvents[fleetId] ? groupedEvents[fleetId].low : 0,
              medium: groupedEvents[fleetId] ? groupedEvents[fleetId].medium : 0,
              high: groupedEvents[fleetId] ? groupedEvents[fleetId].high : 0,
              vehicles: fleet.vehicles.map(vehicle => {
                const serial_mdvr = vehicle.serial;
                return {
                  vehicle_id: vehicle.vehicle_id,
                  serial: serial_mdvr,
                  vehicle_name: vehicle.vehicle_name,
                  low: groupedEvents[fleetId] && groupedEvents[fleetId].vehicles[serial_mdvr] ? groupedEvents[fleetId].vehicles[serial_mdvr].low : 0,
                  medium: groupedEvents[fleetId] && groupedEvents[fleetId].vehicles[serial_mdvr] ? groupedEvents[fleetId].vehicles[serial_mdvr].medium : 0,
                  high: groupedEvents[fleetId] && groupedEvents[fleetId].vehicles[serial_mdvr] ? groupedEvents[fleetId].vehicles[serial_mdvr].high : 0,
                };
              }),
            };
          }),
          drivers_data: data_.drivers_data,
        };
    
        res.status(200).json({
          status: true,
          message: '',
          data: resultData
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