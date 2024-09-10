const { query } = require('../config/database');

const getDataUsage = async (sessionId, offset) => {
  try {
    const result = await query('SELECT * FROM get_data_usage_fn($1,$2) AS QUERY', [
        sessionId,
        offset
    ]);

    if (result[0] && result[0].query) return result[0].query;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    getDataUsage
};