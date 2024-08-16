const { query } = require('./dbconnection');

class DiagnosticAlarmService {
  getDiagnosticAlarmName = async (sessionId) => {
    try {
      const result = await query('SELECT * FROM get_alarm_data_fn($1::TEXT) AS data', [sessionId]);

      return result;
    } catch (error) {
      throw error;
    }
  }

  getDeviceHealthStartEndDatetime = async (fromDate, toDate, serials, alarmCode) => {
    try {
      const result = await query('SELECT * FROM get_device_health_start_end_datetime_fn($1,$2,$3,$4) AS data', [
        fromDate,
        toDate,
        serials,
        alarmCode
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DiagnosticAlarmService();