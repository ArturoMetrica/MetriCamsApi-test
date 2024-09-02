const { query } = require('../config/database');

const getHeatMapAlarm = async (sessionId, fromDate, toDate) => {
  try {
    await query('SELECT * FROM get_heat_map_alarm_fn($1,$2,$3) AS QUERY', [
        sessionId,
        fromDate,
        toDate
    ]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getHeatMapAlarm
};