const handleResponseUtil = require('../utils/handleResponse.util');
const Validator = require('../validators/status.validator');

const getAlarmStatusByDate = async (req, res, next) => {
  try {
    req.alarms = await Validator.getAlarmStatusByDate().validateAsync({
      ...req.body
    });

    next();
  } catch (error) {
    handleResponseUtil(res, 400, false, error.message || error, null);
  }
}

module.exports = { getAlarmStatusByDate };