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

const getAlarmsByGroup = async (req, res, next) => {
  try {
    req.alarm = await AlarmValidator.getAlarmsByGroup().validateAsync({
      ...req.body,
      ...req.query,
      ...req.params
    });

    next();
  } catch (error) {
    handleResponseUtil(res, 400, false, error.message || error, null);
  }
}

const getAlarmsByDriver = async (req, res, next) => {
  try {
    req.alarm = await AlarmValidator.getAlarmsByDriver().validateAsync({
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
    getHeatMapAlarm,
    getAlarmsByGroup,
    getAlarmsByDriver
}