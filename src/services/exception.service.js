const { query } = require('./dbconnection');

class ExceptionService {
  getAttendedAlarmsCount = async (sessionId, startDate, endDate, deviceIdArr, sRuleIdArr, gRuleIdArr, offset) => {
    try {
      const result = await query('SELECT * FROM get_attended_alarms_count_fn($1::TEXT, $2::TIMESTAMP, $3::TIMESTAMP, $4::BIGINT[], $5::BIGINT[], $6::BIGINT[], $7::INTEGER) AS data', [
        sessionId,
        startDate,
        endDate,
        deviceIdArr,
        sRuleIdArr,
        gRuleIdArr,
        offset
      ]);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ExceptionService();