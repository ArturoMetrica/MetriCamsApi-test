const DBService = require('../services/database');
const handleResponseUtil = require('../utils/handleResponse.util');
const dbService = new DBService();
const userService = require('../services/user.service');

class UserController {
  updateUser = async (req, res) => {
    try {
      const { sessionid, name, lastName, idSecLevel, groups, email, action, phone, birthday, idUser, idTimezone, isSummerTime, isMetricamovil_user, userDefinedTime } = req.user;

      const data = await dbService.spUser([
        sessionid,
        name,
        lastName,
        idSecLevel,
        JSON.stringify(groups) || [],
        email,
        action,
        phone,
        birthday,
        idUser,
        idTimezone,
        isSummerTime,
        isMetricamovil_user,
        JSON.stringify(userDefinedTime) || []
      ]);

      res.status(200).json({
        code: 200,
        status: true,
        message: '',
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/user');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { sessionid, action, iduser } = req.user;

      const data = await dbService.spUser([
        sessionid,
        null,
        null,
        null,
        null,
        null,
        action,
        null,
        null,
        iduser,
        null,
        null,
        null,
        null
      ]);

      res.send(data);
    } catch (error) {
      await dbService.errorLogs('API', error, '/user');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getRegisteredUsers = async (req, res) => {
    try {
      const { sessionid, isregistered } = req.user;

      const helper = {
        "-1": null,
        "0": false,
        "1": true
      };
      const action = helper[isregistered];

      let result = await dbService.getRegisteredUsers([sessionid, action]);
      if (result.data !== null && result.status) result.data = result.data[0].data;
      res.send(result);
    } catch (error) {
      await dbService.errorLogs('API', error, '/registeredusers');

      res.status(400).json(error.message);
    }
  }

  completeRegister = async (req, res) => {
    try {
      const { code } = req.user;

      let result = await dbService.getIncompleteUser([code]);
      if (result.data !== null && result.status) result.data = result.data[0].data;

      res.send(result);
    } catch (error) {
      await dbService.errorLogs('API', error, '/user/complete-register');

      res.status(400).json(error.message);
    }
  }

  setUserDuration = async (req, res) => {
    try {
      await userService.setUserDuration(req.user);
      handleResponseUtil(res, 200, true, "ok", null);
    } catch (error) {
      handleResponseUtil(res, 500, false, error.message || error, null)
    }
  }
}

module.exports = new UserController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/