const { query } = require('../config/database');

const getHeatMapAlarm = async (sessionId, fromDate, toDate) => {
  try {
    return await query('SELECT * FROM get_heat_map_alarm_fn($1,$2,$3) AS QUERY', [
        sessionId,
        fromDate,
        toDate
    ]);
  } catch (error) {
    throw error;
  }
}

const getAlarmsByGroup = async (sessionId, fromDate, toDate) => {
  try {
    return await query('SELECT * FROM get_alarms_by_groups_fn($1,$2,$3) AS QUERY', [
        sessionId,
        fromDate,
        toDate
    ]);
  } catch (error) {
    throw error;
  }
}

const getAlarmsByDriver = async (sessionId, fromDate, toDate) => {
  try {
    return await query('SELECT * FROM get_alarms_by_driver_fn($1,$2,$3) AS QUERY', [
        sessionId,
        fromDate,
        toDate
    ]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getHeatMapAlarm,
  getAlarmsByGroup,
  getAlarmsByDriver
};