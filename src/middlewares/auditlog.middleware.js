const handleResponseUtil = require('../utils/handleResponse.util');
const AuditlogValidator = require('../validators/auditlog.validator');

const insertAuditlog = async (req, res, next) => {
  try {
    req.auditlog = await AuditlogValidator.insertAuditlog().validateAsync({
      ...req.body
    });

    next();
  } catch (error) {
    handleResponseUtil(res, 400, false, error.message || error, null);
  }
}

module.exports = {
  insertAuditlog
}