const { query } = require('../config/database');

const getRiskAnalytics = async ({ vehicles, fromDate, toDate, rowNumber, limit }) => {
  try {
    const [result] = await query('SELECT * FROM get_risk_analytics_fn($1,$2,$3,$4,$5) AS query', [
      vehicles ? JSON.stringify(vehicles) : '[]',
      fromDate,
      toDate,
      rowNumber,
      limit
    ]);

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRiskAnalytics
}