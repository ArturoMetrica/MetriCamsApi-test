const handleResponseUtil = require("../utils/handleResponse.util");
const auditlogService = require('../services/auditlog.service');

const insertAuditlog = async (req, res) => {
  try {
    await auditlogService.insertAuditlog(req.sessionid.sessionid, req.auditlog);
    handleResponseUtil(res, 200, true, 'ok', null);
  } catch (error) {
    handleResponseUtil(res, 500, false, error.message || error, null);
  }
}

module.exports = {
  insertAuditlog
}