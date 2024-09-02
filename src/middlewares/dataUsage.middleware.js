const handleResponseUtil = require('../utils/handleResponse.util');
const DataUsageValidator = require('../validators/dataUsage.validator');

const getDataUsage = async (req, res, next) => {
  try {
    req.data = await DataUsageValidator.getDataUsage().validateAsync({
      ...req.body,
      ...req.query,
      ...req.params
    });

    next();
  } catch (error) {
    handleResponseUtil(res, 400, false, error.message || error, null);
  }
}

module.exports = {
    getDataUsage
}