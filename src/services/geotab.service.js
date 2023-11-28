const _ = require('lodash');
const { geotab } = require('../config/env');
const GeotabHelper = require('../helpers/geotab.helper');

class GeotabService extends GeotabHelper {
  constructor({ username = geotab.username, password = geotab.password, database = geotab.database, server = geotab.server, sessionId, userName, name } = {}) {
    super(username || userName || name, password, database, server, sessionId);
  }

  async getUsers({ isDriver, name }) {
    try {
      const api = await super.getApi();
      const users = await api.callAsync('Get', {
        typeName: 'User',
        search: {
          isDriver: isDriver ? true : undefined,
          firstName: name ? `%${name}%` : undefined
        }
      });
      const groupDict = await this.getGroupsDictionary();

      return users.map((user) => ({
        name: user.name || '',
        fistName: user.fistName || '',
        lastName: user.lastName || '',
        license: user.licenseNumber || '',
        employeeNumber: user.employeeNo || '',
        id: user.id || '',
        isDriver: user.isDriver || '',
        phoneNumber: user.phoneNumber || '',
        phoneNumberExt: user.phoneNumberExt || '',
        groups: user.companyGroups.map((e) => groupDict[e.id] || undefined) || []
      }));
    } catch (error) {
      return [];
    }
  }

  async getGroupsDictionary() {
    const api = await super.getApi();
    const groups = await api.callAsync('Get', {
      typeName: 'Group'
    });
    return groups.reduce((acc, el) => ({ ...acc, [el.id]: el.name }), {});
  }

  getPowerOnOffBody(deviceId, relayOn = false) {
    return {
      typeName: 'TextMessage',
      entity: {
        device: {
          id: deviceId
        },
        messageContent: {
          isRelayOn: relayOn,
          contentType: 'IoxOutput'
        },
        isDirectionToVehicle: true
      }
    };
  }

  async sendPowerOn(geotabDeviceId) {
    const api = await super.getApi();
    const call = this.getPowerOnOffBody(geotabDeviceId, true);

    const result = await api.callAsync('Add', call);
    return result;
  }

  async sendPowerOff(geotabDeviceId) {
    const api = await super.getApi();
    const call = this.getPowerOnOffBody(geotabDeviceId);

    const result = await api.callAsync('Add', call);
    return result;
  }

  async getStatusOnOffGO() {
    const api = await super.getApi();
    const status = await api.call('Get', {
      typeName: "TextMessage",
      search: {
        fromDate: Date.now(),
        contentType: ['Immobilization', 'IoxOutput']
      }
    });
    return status;
  }

  async getTypeZones() {
    const api = await super.getApi();
    const typeZones = await api.callAsync('Get', {
      typeName: 'ZoneType'
    });

    const tZones = typeZones.map(e => (typeof e !== "string" ? { id: e.id, name: e.name } : { id: e }));

    return tZones;
  }

  async getDriverList() {
    const api = await super.getApi();
    const list = await api.callAsync('Get', {
      typeName: 'User',
      search: {
        isDriver: true
      }
    });

    const drivers = list.map(driver => ({
      id: driver.id,
      firstName: driver.firstName,
      lastName: driver.lastName,
      name: driver.name
    }));

    return drivers;
  }

  async getLastCommunication (deviceId) {
    const api = await super.getApi();
    const lastCommunication = await api.callAsync('Get', {
      typeName: 'DeviceStatusInfo',
      search: {
        deviceId: deviceId
      }
    });

    return lastCommunication[0];
  }

  async addDriver (email, firstName, lastName, password) {
    const api = await super.getApi();
    const newDriver = await api.callAsync('Add', {
      typeName: 'User',
      entity: {
        name: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        isDriver: true,
        companyGroups : [{
          id : "GroupCompanyId"
        }],
        securityGroups : [{
          id : "GroupEverythingSecurityId"
        }],
        userAuthenticationType : "BasicAuthentication",
        activeFrom : new Date().toISOString(),
        activeTo : "2050-01-01T00:00:00.000Z",
        // driverGroups : driverGroups
      }
    });

    return newDriver;
  }

}

module.exports = GeotabService;

/********************* Propiedad de Métrica Móvil SA de CV **************************/