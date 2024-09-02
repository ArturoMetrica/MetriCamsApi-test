const handleResponseUtil = require('../utils/handleResponse.util');
const AlarmValidator = require('../validators/alarm.validator');

const getHeatMapAlarm = async (req, res, next) => {
  try {
    req.alarm = await AlarmValidator.getHeatMapAlarm().validateAsync({
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
    getHeatMapAlarm
}