const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
const DBService = require('../services/database');
const dbService = new DBService();
const riskAnalyticsService = require('../services/riskAnalytics.service');
const { token } = require('morgan');

const { baseURL, getDashboardAnalytics, apiKeyName, apiKeyValue } = require('../config/env').alarmCollector;

const findChildren = (g, groups) => {
  return {
    ...g,
    children: groups.filter((c) => c.parentId === g.id).map((e) => findChildren(e, groups))
  };
}

const multiTree = (groups) => {
  const roots = groups.filter((g) => !groups.map((g) => g.id).includes(g.parentId));
  const trees = roots.map((rootGroup) => findChildren(rootGroup || {}, groups));
  return trees;
}

function matchCounts(tree, data) {
  tree.forEach(node => {
      const idGroup = node.id;

      const dataGroup = data.find(e => e.idGroup === idGroup) || { low: 0, medium: 0, high: 0 };
          node.low = dataGroup.low || 0;
          node.medium = dataGroup.medium || 0;
          node.high = dataGroup.high || 0;

      if (node.children.length > 0) {
          matchCounts(node.children, data);
      }
  });

  return tree;
}

// Función recursiva para realizar la suma jerárquica y actualizar las propiedades originales
function hierarchicalSum(grupo) {
  if (!grupo.children || grupo.children.length === 0) {
    // Si no hay hijos, simplemente devolver los valores actuales
    return {
      high: grupo.high,
      medium: grupo.medium,
      low: grupo.low
    };
  }

  // Inicializar variables con los valores actuales del grupo
  let high = grupo.high;
  let medium = grupo.medium;
  let low = grupo.low;

  // Recorrer los hijos y calcular las sumas recursivamente
  for (const hijo of grupo.children) {
    const { high: hijoHigh, medium: hijoMedium, low: hijoLow } = hierarchicalSum(hijo);
    high += hijoHigh;
    medium += hijoMedium;
    low += hijoLow;
  }

  // Actualizar los valores en el grupo actual
  grupo.high = high;
  grupo.medium = medium;
  grupo.low = low;

  // Devolver los valores para que se puedan usar en niveles superiores
  return {
    high,
    medium,
    low
  };
}

function buildIndex(tree) {
  let index = {};

  tree.forEach(node => {
      let id = node.id;
      let params = { low: node.low, medium: node.medium, high: node.high };

      index[id] = params;

      if (node.children.length > 0) {
          let childrenIndex = buildIndex(node.children);
          index[id].children = childrenIndex;
      }
  });

  return index;
}

function buildFlatIndex(tree, index = {}) {
  tree.forEach(node => {
      let id = node.id;
      let params = { low: node.low, medium: node.medium, high: node.high };

      index[id] = params;

      if (node.children.length > 0) {
          buildFlatIndex(node.children, index);
      }
  });

  return index;
}

class Controller {
    getVehiclesAndDriversByGroupsLevel = async (req, res) => {
      try {
        const { idFleet, startDate, endDate } = req.analytics;
        const { sessionid } = req.sessionid;
        const headers = {};
        headers[apiKeyName] = apiKeyValue;
    
        const data_ = await dbService.getVehiclesAndDriversByGroupsLevel(sessionid, idFleet);
        const vehicles = await dbService.getVehicles([sessionid]);

        let deviceIndex = [];
        let groupedVehicles = {};

        // Filtrar arreglo indexado de vehiculos por grupo
        vehicles.data.forEach(item => {
            let vehicles = item.vehicle_device_data
                .filter(vehicle => vehicle.deviceType === "MDVR")
                .reduce((acc, vehicle) => {
                    acc.push({
                        [vehicle.serialName]: { low: 0, medium: 0, high: 0 }
                    });
                    return acc;
                }, []);

            if (!groupedVehicles[item.idGroup]) {
                groupedVehicles[item.idGroup] = [];
            }

            groupedVehicles[item.idGroup] = groupedVehicles[item.idGroup].concat(vehicles);
        });

        for (let idGroup in groupedVehicles) {
            deviceIndex.push({
                idGroup: parseInt(idGroup),
                vehicles: groupedVehicles[idGroup]
            });
        }

        let mdvrs = [];

        deviceIndex.forEach(e => {
            e.vehicles.forEach(m => {
                let mdvr = Object.keys(m)[0];
                mdvrs.push(mdvr);
            });
        });
    
        // const { data: eventsData } = await axios.post(baseURL + getDashboardAnalytics,
        //   {
        //     startDate,
        //     endDate,
        //     vehicles: mdvrs
        // },
        //   {
        //     headers
        //   });

        const eventsData = await riskAnalyticsService.getRiskAnalytics(sessionid, mdvrs, startDate, endDate, 0, 0, -6);
          
          deviceIndex.forEach(group => {
            group.vehicles.forEach(device => {
                const serial = Object.keys(device)[0];
                const serialEvents = eventsData.filter(e => e.serial_mdvr === serial);

                const count = {
                    "low": 0,
                    "medium": 0,
                    "high": 0
                };

                // Contar eventos
                serialEvents.forEach(event => {
                  // event.risk_details.forEach(d => {
                  //   count[d.risk_level.toLowerCase()]++;
                  // });
                  count[event.risk_score_level.toLowerCase()]++;
                });

                device[serial] = count;
            });
          });

          deviceIndex.forEach(e => {
            let totalLow = 0;
            let totalMedium = 0;
            let totalHigh = 0;

            e.vehicles.forEach(device => {
                const serial = Object.keys(device)[0];
                const count = device[serial];

                totalLow += count.low;
                totalMedium += count.medium;
                totalHigh += count.high;
            });

            // Actualizar los totales en el objeto principal
            e.low = totalLow;
            e.medium = totalMedium;
            e.high = totalHigh;
          });

          // console.log(JSON.stringify(deviceIndex));

          const { data: groups } = await dbService.getGroups(sessionid);
          const dataGroups = multiTree(groups[0].data);
          const treeIndex = matchCounts(dataGroups, deviceIndex);
          
          for (const group of treeIndex) {
            hierarchicalSum(group);
          }

          let resultingIndex = buildFlatIndex(treeIndex);

          // Arreglo indexado con sus respectivos conteos
          // console.log(JSON.stringify(resultingIndex));

        // Lógica para agrupar eventos por fleet_id, risk_level y contarlos
        const groupedEvents = {};
        eventsData.forEach(event => {
          const fleetIdObject = data_.vehicle_data.find(fleet => fleet.vehicles.some(vehicle => vehicle.serial === event.serial_mdvr));
          const fleetId = fleetIdObject ? fleetIdObject.fleet_id : null;

          // if (!fleetId) {
          //   return;
          // }

          if (!groupedEvents[fleetId]) {
            groupedEvents[fleetId] = { low: 0, medium: 0, high: 0, vehicles: {} };
          }
    
          if (!groupedEvents[fleetId].vehicles[event.serial_mdvr]) {
            groupedEvents[fleetId].vehicles[event.serial_mdvr] = { low: 0, medium: 0, high: 0 };
          }
    
          // Incrementar el contador según el risk_level
          // groupedEvents[fleetId][event.risk_level.toLowerCase()] += 1;
          // groupedEvents[fleetId].vehicles[event.serial_mdvr][event.risk_level.toLowerCase()] += 1;

          // event.risk_details.forEach(e => {
          //   const riskLevel = e.risk_level.toLowerCase();
          //   groupedEvents[fleetId][riskLevel] += 1;
          //   groupedEvents[fleetId].vehicles[event.serial_mdvr][riskLevel] += 1;            
          // });
          groupedEvents[fleetId][event.risk_score_level.toLowerCase()] += 1;
          groupedEvents[fleetId].vehicles[event.serial_mdvr][event.risk_score_level.toLowerCase()] += 1;
        });

          // Lógica para agrupar drivers por ftapi_driver_id y driver_id y contarlos
          const groupedDrivers = {};

          for (const driverGroup of data_.drivers_data) {
            for (const driver of driverGroup.drivers) {
              if (!groupedDrivers[driver.ftapi_driver_id]) {
                groupedDrivers[driver.ftapi_driver_id] = { low: 0, medium: 0, high: 0 };
              }
            }
          }

          for (const event of eventsData) {
            for (const driverGroup of data_.drivers_data) {
              for (const driver of driverGroup.drivers) {
                if (driver.ftapi_driver_id === event.driver_id) {
                  // Incrementar el contador según el risk_level y el match entre ftapi_driver_id y driver_id
                  // event.risk_details.forEach(e => {
                  //   const riskLevel = e.risk_level.toLowerCase();
                  //   groupedDrivers[driver.ftapi_driver_id][riskLevel] += 1;
                  // });
                  groupedDrivers[driver.ftapi_driver_id][event.risk_score_level.toLowerCase()] += 1;
                }
              }
            }
          }
    
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
          drivers_data: data_.drivers_data.map(driverGroup => {
            return {
              drivers: driverGroup.drivers.map(driver => {
                return {
                  driver_id: driver.driver_id,
                  ftapi_driver_id: driver.ftapi_driver_id,
                  driver_name: driver.driver_name,
                  low: groupedDrivers[driver.ftapi_driver_id] ? groupedDrivers[driver.ftapi_driver_id].low : 0,
                  medium: groupedDrivers[driver.ftapi_driver_id] ? groupedDrivers[driver.ftapi_driver_id].medium : 0,
                  high: groupedDrivers[driver.ftapi_driver_id] ? groupedDrivers[driver.ftapi_driver_id].high : 0,
                };
              }),
            };
          }),
          groups_data: data_.groups_data.map(group => {
            return {
              fleet_id: group.fleet_id,
              fleet_name: group.fleet_name,
              id_parent_fleet: group.id_parent_fleet,
              id_ftapi_fleet: group.id_ftapi_fleet,
              id_ftapi_parent_fleet: group.id_ftapi_parent_fleet,
              // low: groupedEvents[group.fleet_id] ? groupedEvents[group.fleet_id].low : 0,
              // medium: groupedEvents[group.fleet_id] ? groupedEvents[group.fleet_id].medium : 0,
              // high: groupedEvents[group.fleet_id] ? groupedEvents[group.fleet_id].high : 0,
              low: resultingIndex[group.fleet_id] ? resultingIndex[group.fleet_id].low : 0, // Modificacion para que tome los totales de treeIndex
              medium: resultingIndex[group.fleet_id] ? resultingIndex[group.fleet_id].medium : 0,
              high: resultingIndex[group.fleet_id] ? resultingIndex[group.fleet_id].high : 0,
            }
          }),
          group_parent_data: data_.group_parent_data.map(group => {
            return {
              fleet_id: group.fleet_id,
              fleet_name: group.fleet_name,
              id_parent_fleet: group.id_parent_fleet,
              id_fleet_ftapi: group.id_fleet_ftapi,
              id_ftapi_parent_fleet: group.id_ftapi_parent_fleet,
              low: resultingIndex[group.fleet_id] ? resultingIndex[group.fleet_id].low : 0, // Modificacion para que tome los totales de treeIndex
              medium: resultingIndex[group.fleet_id] ? resultingIndex[group.fleet_id].medium : 0,
              high: resultingIndex[group.fleet_id] ? resultingIndex[group.fleet_id].high : 0,
            }
          }),
        };
    
        res.status(200).json({
          status: true,
          message: '',
          data: resultData
        });
    
      } catch (error) {
        await dbService.errorLogs('API', error, '/api/dashboard-analytics');
    
        res.status(500).json({
          status: false,
          message: error.message || error,
          data: null
        });
      }
    }
    
}

module.exports = new Controller();