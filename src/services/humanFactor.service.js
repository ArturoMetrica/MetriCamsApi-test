const { query } = require('../config/database');

const getRiskAnalytics = async (sessionId, { vehicles, startDate, endDate, rowNumber, limit, offset }) => {
  try {
    const [result] = await query('SELECT * FROM get_risk_analytics_fn($1,$2,$3,$4,$5,$6,$7) AS query', [
      sessionId,
      vehicles,
      startDate,
      endDate,
      rowNumber,
      limit,
      offset
    ]);

    return result.query;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRiskAnalytics
}