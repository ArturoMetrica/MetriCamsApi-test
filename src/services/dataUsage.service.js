const { query } = require('../config/database');

const getDataUsage = async (sessionId, offset) => {
  try {
    await query('SELECT * FROM get_data_usage_fn($1,$2) AS QUERY', [
        sessionId,
        offset
    ]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
    getDataUsage
};