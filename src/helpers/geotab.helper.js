const API = require('mygeotab-api-node');
const FileUtils = require('../utils/file.util');

const sessionFileURI = './session';
const dayInMs = 1000 * 60 * 60 * 24;

class GeotabHelper {
  constructor(username, password, database, server, sessionId) {
    if (!username) {
      throw new Error(`'username' is required`);
    }
    if (!password && !sessionId) {
      throw new Error(`'password' or 'sessionId' is required`);
    }
    if (!database) {
      throw new Error(`'database' is required`);
    }
    if (!server) {
      throw new Error(`'server' is required`);
    }
    this.username = username;
    this.password = password;
    this.database = database;
    this.server = server || 'my.geotab.com';
    this.sessionId = sessionId;
  }

  async initApi(renew = false) {
    try {
      if (renew) return this.updateSessionId();
      const { sessionId, date } = await FileUtils.readJSON(sessionFileURI);
      if (sessionId && new Date() - dayInMs < new Date(date)) {
        this.sessionId = sessionId;
        this.api = new API(this.username, null, this.sessionId, this.database, this.server);

        return this.api;
      }
      return this.updateSessionId();
    } catch (error) {
      return this.updateSessionId();
    }
  }

  async updateSessionId() {
    try {
      console.log(new Date(), 'Updating session id');
      if (!this.password) return this.generateTemporal();

      this.api = new API(this.username, this.password, this.sessionId, this.database, this.server);
      const loginResult = await this.api.authenticateAsync();
      if (loginResult && loginResult.credentials) {
        this.sessionId = loginResult.credentials.sessionId;
        this.server = this.server || loginResult.path;
      }
      await FileUtils.writeJSON(sessionFileURI, {
        sessionId: this.sessionId,
        date: new Date()
      });
      this.api = new API(this.username, null, this.sessionId, this.database, this.server);
      console.log(new Date(), 'Updated session id');
      return this.api;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getApi() {
    return this.initApi();
  }

  generateTemporal() {
    this.api = new API(this.username, null, this.sessionId, this.database, this.server);
    console.log(new Date(), 'Updated session id');
    return this.api;
  }
}

module.exports = GeotabHelper;

/********************* Propiedad de Métrica Móvil SA de CV **************************/