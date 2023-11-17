const API = require('mg-api-js');

class ssoHelper {
  authUserBySessionId = ({ database, path, userName, sessionId }) => {
    try {
      const authentication = {
        credentials: {
          database,
          userName,
          sessionId
        },
        path
      };

      return new API(authentication);
    } catch (error) {
      throw error;
    }
  }

  callByUser = async (user, method = 'GetSystemTimeUtc', params = {}) => {
    try {
      const api = this.authUserBySessionId(user);
      return await api.call(method, params);
    } catch (error) {      
      throw error
    }
  }
}

module.exports = new ssoHelper();

/********************* Propiedad de Métrica Móvil SA de CV **************************/