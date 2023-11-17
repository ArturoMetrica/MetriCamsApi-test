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
}

module.exports = new DiagnosticAlarmService();