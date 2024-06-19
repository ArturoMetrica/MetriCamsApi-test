const DBService = require('../services/database');
const { callByUser } = require('../helpers/sso.helper');
const { getLoginData, ssoLogin, loginConnectorDB, logUserQuiz } = new DBService();
const DbService = new DBService();

class AuthController {
  login = async (req, res) => {
    try {
      const { username, pass, userIdentity } = JSON.parse(Buffer.from(req.auth.d, 'base64').toString());

      if (!username || !pass) throw 'An error has occurred';

      const data = await getLoginData([username, pass, userIdentity]);

      res.status(200).send(data);
    } catch (error) {
      await DbService.errorLogs('API', error, '/login');
      
      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  ssoLogin = async (req, res) => {
    try {
      const user = JSON.parse(Buffer.from(req.auth.s, 'base64').toString());
      await callByUser(user);

      const data = await ssoLogin([user.userName.toLowerCase()]);

      res.status(200).json({
        code: 200,
        status: true,
        message: 'Successful SSO',
        data
      });
    } catch (error) {
      await DbService.errorLogs('API', error, '/sso');

      if (error.message.includes("JSONRPCError - Incorrect login credentials")) {
        return res.status(401).json({
          code: 401,
          status: false,
          message: 'Invalid sessionId',
          data: null
        });
      }
      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  loginConnector = async (req, res) => {
    try {
      const { username, pass, token, langid } = req.auth;

      const data = await loginConnectorDB(username, pass, token, langid);

      res.status(200).send(data);
    } catch (error) {
      await DbService.errorLogs('API', error, '/login-connector');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  logUserQuiz = async (req, res) => {
    try {
      const { isComplete } = req.auth;
      const { sessionid } = req.sessionid;

      const data = await logUserQuiz(sessionid, isComplete);

      return res.status(200).json({
        status: false,
        message: 'Quiz saved',
        data: null
      });
    } catch (error) {
      await DbService.errorLogs('API', error, '/user/quiz');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}


module.exports = new AuthController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/