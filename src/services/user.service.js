const { query } = require('../config/database');

const setUserDuration = async ({ username, module, startDate, endDate, seconds }) => {
  try {
    return await query('SELECT * FROM duration_log_insert_fn($1, $2, $3, $4, $5) AS QUERY', [
      username,
      module,
      startDate,
      endDate,
      seconds
    ]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  setUserDuration
}