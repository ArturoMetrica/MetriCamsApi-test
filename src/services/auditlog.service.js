const { query } = require('../config/database');

const insertAuditlog = async (sessionId, { module, selection, element, action, datetime }) => {
  try {
    await query('SELECT * FROM auditlog_detailed_insert_fn($1::TEXT,$2::TEXT,$3::INT[],$4::TEXT,$5::TEXT,$6::TIMESTAMP(0))',
      [
        sessionId,
        module,
        selection,
        element,
        action,
        datetime
      ]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insertAuditlog
};