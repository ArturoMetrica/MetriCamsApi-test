const GroupsService = require('./groups.service');
const { getData: queryReq, query } = require('./dbconnection');
const moment = require('moment');

async function getData(query, params) {
  const data = await queryReq(query, params);
  return data;
}

class DBData {
  async getLoginData(params) {
    const result = await getData(`SELECT * FROM spLogin($1, $2, $3, null) as splogin`, params);

    if (result.data && result.data[0] && result.data[0]) return result.data[0];

    throw new Error(result.message);
  }

  async getSessionData(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM getActiveSession($1, $2) AS data', params);
      res(result);
    });
  }

  async spLogout(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM spLogout($1) AS data', params);
      res(result);
    });
  }

  async getGroupsTree(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM getUserGroupsTree($1) AS data', params);
      res(result);
    });
  }

  async spGroups(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM spFleet($1, $2, $3, $4, $5) AS data', params);
      res(result);
    });
  }

  async spSysFunc(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM spSysFuncs($1, $2, $3, $4) AS data', params);
      res(result);
    });
  }

  async getSystemFunctions() {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM vwSystemFunctions', null);
      res(result);
    });
  }

  async getSecurityRoles(sessionId) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM security_role_select_fn($1)', [sessionId]);
      res(result);
    });
  }

  async spSecurityRoles(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM spsecurityroles($1, $2, $3::JSON, $4, $5, $6) AS data', params);
      res(result);
    });
  }

  async getRegisteredUsers(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM getUsersByAdmin($1, $2) AS data', params);
      res(result);
    });
  }

  async spNewUser(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT spUserByAdmin ($1, $2::JSON, $3, $4, $5, $6) AS data', params);
      res(result);
    });
  }

  async getCodeForResend(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM getUserCode($1, $2) AS data', params);
      res(result);
    });
  }

  async getIncompleteUser(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM getUserIncompleteData($1) AS data', params);
      res(result);
    });
  }

  async getIncompleteUserReq(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM getUserIncompleteData_req($1) AS data', params);
      res(result);
    });
  }

  async spFinishUsers(params) {
    return new Promise(async (res) => {
      const result = await getData(
        'SELECT * FROM spFinishUsers($1, $2, $3, $4, $5, $6::TEXT[], $7) AS data',
        params
      );
      res(result);
    });
  }

  async spUser(params) {
    return new Promise(async (res) => {
      const result = await getData(
        'SELECT * FROM spUsers($1, $2, $3, $4, $5::JSON, $6, $7, $8::TEXT[], $9, $10, $11, $12, $13, $14::JSON) AS data',
        params
      );

      res(result);
    });
  }

  async spPassChange(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM spPasswordChange($1, $2) AS data', params);
      res(result);
    });
  }

  async spUserChangePassword({ token, newPassword }) {
    return getData('SELECT * FROM spPassChange($1, $2)', [token, newPassword]);
  }

  async getVehicles(params) {
    return new Promise(async (res, rej) => {
      const result = await getData('SELECT * FROM getVehiclesByUser($1) AS data', params);
      if (!result.status) rej(result);

      if (result.data) result.data = result.data[0].data;
      res(result);
    });
  }

  async spVehicles(params) {
    return new Promise(async (res) => {
      const result = await getData(
        'SELECT * FROM spVehicles($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) AS data',
        params
      );
      res(result);
    });
  }

  async getAlarmData(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM getTranslatedAlarms($1) AS data', params);
      res(result);
    });
  }

  async getAlarmLanguages() {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM viewLanguages', null);
      res(result);
    });
  }

  async spLanguages(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM spLanguage($1, $2, $3) AS data', params);
      res(result);
    });
  }

  async spRules(params) {
    return new Promise(async (res) => {
      try {
        const result = await getData(
          'SELECT * FROM spRules($1::BIGINT, $2::TEXT, $3::BIGINT[], $4::BIGINT[], $5::BIGINT, $6::TEXT, $7::TEXT, $8::BOOLEAN, $9::BOOLEAN, $10::BOOLEAN, $11::INT, $12::INT, $13::BOOLEAN, $14::TEXT[], $15::INT, $16::TIMESTAMP(0), $17::BOOLEAN, $18::BOOLEAN, $19::INT, $20::VARCHAR, $21::VARCHAR, $22::VARCHAR, $23::VARCHAR, $24::BOOLEAN, $25::BOOLEAN, $26::VARCHAR, $27::VARCHAR, $28::VARCHAR, $29::VARCHAR) AS data',
          params
        );
        res(result);
      } catch (error) {
        console.log(error);
      }
    });
  }

  async updateStreamaxRule({ id, sessionid, idVehicles, groups, idAlarm, name, desc, isPublic, isPopup, isEmail, secsPre, secsPos, isActive, emails, action, creationDate, gifRequired, videoRequired, alarmcategoryid, zoneRestrictionIdEntry, zoneRestrictionNameEntry, zoneRestrictionIdExit, zoneRestrictionNameExit, zoneRestriction }) {
    const result = await getData(`SELECT * FROM spRules($1, $2, $3::BIGINT[], $4::BIGINT[], $5, $6, $7, $8, $9, $10, $11, $12, $13, $14::TEXT[], $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) AS data`, [
      id,
      sessionid,
      idVehicles,
      groups,
      idAlarm,
      name,
      desc,
      isPublic,
      isPopup,
      isEmail,
      secsPre,
      secsPos,
      isActive,
      emails,
      action,
      creationDate,
      gifRequired,
      videoRequired,
      alarmcategoryid,
      zoneRestrictionIdEntry,
      zoneRestrictionNameEntry,
      zoneRestrictionIdExit,
      zoneRestrictionNameExit,
      zoneRestriction
    ]);

    if (result.data && result.data[0]) return result.data[0].data;

    throw new Error(result.message);
  }

  async getRules(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM getRules($1) AS data', params);
      res(result);
    });
  }

  async getAlarmsInfo(params) {
    return new Promise(async (res) => {
      const result = await getData(
        'SELECT * FROM getAlarmsByUser($1, $2::BIGINT[], $3::BIGINT[], $4::TIMESTAMPTZ, $5::TIMESTAMPTZ, $6::BOOLEAN, NULL) AS data',
        params
      );
      res(result);
    });
  }

  async getChartInfo(params) {
    return getData(
      `SELECT * FROM getAlarmsByUser($1, $2::BIGINT[], $3::BIGINT[], $4::TIMESTAMPTZ, $5::TIMESTAMPTZ, $6::BOOLEAN, NULL) AS data`,
      params
    );
  }

  async spViewAlarm(params) {
    return new Promise(async (res) => {
      const result = await getData(
        'SELECT * FROM spViewAlarm($1::TEXT, $2::BIGINT[], $3::BOOLEAN) AS data',
        params
      );
      res(result);
    });
  }

  async spHistoricalVid(params) {
    return new Promise(async (res) => {
      const result = await getData(
        'SELECT * FROM spHistVideo($1, $2, $3, $4, $5, $6, $7, $8, $9) AS data',
        params
      );
      res(result);
    });
  }

  async spUserConfg(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM spUserConfig($1, $2, $3, $4, $5, $6, $7) AS data', params);
      res(result);
    });
  }

  async getTimezone() {
    return new Promise(async (res) => {
      const result = await getData('SELECT * FROM getTimeZones(NULL, NULL, NULL, NULL) AS data');
      res(result);
    });
  }

  async getVehiclesStatusCount(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT data FROM getVehiclesByUserCount($1) AS data', params);
      res(result);
    });
  }

  async spViewAlarmV2(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT spViewAlarmsV2($1,$2) AS data', params);
      res(result);
    });
  }

  async spChangePassReq(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT spGetPassChangeCode($1) AS data', params);
      res(result);
    });
  }

  async spChangePass(params) {
    return new Promise(async (res) => {
      const result = await getData('SELECT spChangePassword($1, $2) AS data', params);
      res(result);
    });
  }

  async getTemplates({ sessionid }) {
    return getData('SELECT * from template_select_fn($1) as data', [sessionid]);
  }

  async insertTemplate({ sessionid, id, name, filename, groups }) {
    return getData('SELECT * from template_insert_fn($1, $2, $3, $4, $5::json) as data', [
      sessionid,
      id,
      name,
      filename,
      groups
    ]);
  }

  async updateTemplate({ sessionid, id, name, filename, groups }) {
    return getData('SELECT * from template_update_fn($1, $2, $3, $4, $5::json) as data', [
      sessionid,
      id,
      name,
      filename,
      groups
    ]);
  }

  async deleteTemplate({ sessionid, id }) {
    return getData('SELECT * from template_delete_fn($1, $2) as data', [sessionid, id]);
  }

  async checkValidToken({ sessionid }) {
    const res = await getData('SELECT * from checkvalidtoken($1) as data', [sessionid]);
    if (res.code) throw new Error(`Invalid session id ${res.code}`);
  }

  async getAlarmConfig({ sessionid }) {
    return getData('SELECT * from user_top_alarms_select_fn($1) as query', [sessionid]);
  }

  async createAlarmConfig({ sessionid, rules, vehicles }) {
    return getData('SELECT * from user_top_alarms_insert_fn($1, $2, $3) as query', [
      sessionid,
      JSON.stringify(rules),
      JSON.stringify(vehicles)
    ]);
  }

  async updateAlarmConfig({ sessionid, rules, vehicles }) {
    return getData('SELECT * from user_top_alarms_update_fn($1, $2, $3) as query', [
      sessionid,
      JSON.stringify(rules),
      JSON.stringify(vehicles)
    ]);
  }

  async deleteAlarmConfig({ sessionid }) {
    return getData('SELECT * from user_top_alarms_delete_fn($1) as query', [sessionid]);
  }

  async getChannel() {
    const result = await getData(`SELECT * FROM select_vehicle_channel_fn() as query`);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    return null;
  }

  async getReportConfig(report) {
    const result = await getData(`SELECT * FROM report_select_fn($1) as query`, [report.sessionid]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw { code: 500, message: 'GetReportsError@get' };
  }

  async getReportVisibilityConfig(report) {
    const result = await getData(`SELECT * FROM visibility_select_fn($1) as query`, [report.sessionid]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw { code: 500, message: 'GetReportsError@getVisibility' };
  }

  async createReportConfig(report) {
    const result = await getData(
      `SELECT * FROM report_insert_fn($1, $2, $3::json, $4::json, $5, $6, $7, $8::json, $9::json, $10, $11, $12, $13) as query`,
      [
        report.sessionid,
        report.name,
        report.rules,
        report.emails,
        report.periodicityId,
        report.time,
        report.periodicityValue,
        report.groups,
        report.vehicles,
        report.visibilityId,
        report.offset,
        report.isSummerTime,
        report.timezoneId,
      ]
    );
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw { code: 500, message: result.message || 'GetReportsError@create' };
  }

  async updateReportConfig(report) {
    const result = await getData(
      `SELECT * FROM report_update_fn($1, $2, $3, $4::json, $5::json, $6, $7, $8, $9::json, $10::json, $11, $12, $13, $14) as query`,
      [
        report.sessionid,
        report.id,
        report.name,
        report.rules,
        report.emails,
        report.periodicityId,
        report.time,
        report.periodicityValue,
        report.groups,
        report.vehicles,
        report.visibilityId,
        report.offset,
        report.isSummerTime,
        report.timezoneId,
      ]
    );
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw { code: 500, message: 'GetReportsError@update' };
  }

  async deleteReportConfig(report) {
    const result = await getData(`SELECT * FROM report_delete_fn($1, $2) as query`, [report.sessionid, report.id]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw { code: 500, message: 'GetReportsError' };
  }

  async getAllVehicles(sessionid) {
    const { data } = await this.getVehicles([sessionid]);
    return data;
  }

  async getAllSubgroups(sessionid, groupIds) {
    const { data } = await this.getGroupsTree([sessionid]);

    if (!data || !data.length || !data[0] || !data[0].data) return [];
    const groups = data[0].data;
    const trees = GroupsService.multiTree(groups);

    const allGroups = GroupsService.flatFromMultiTree(trees, groupIds);
    return allGroups;
  }

  async findVehicles(sessionid, vehicleIds, groupIds) {
    const data = await this.getAllVehicles(sessionid);
    const groups = await this.getAllSubgroups(sessionid, groupIds);

    if (vehicleIds) return data[0].data.filter((v) => vehicleIds.includes(v.id));
    if (groupIds) return data[0].data.filter((v) => groups.map((g) => g.id).includes(v.idGroup));
    return data[0].data;
  }

  async getCodeGroups(codeGroup) {
    const result = await getData(`SELECT * FROM code_group_select_fn($1) as query`, [codeGroup.sessionid]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw {
      code: 500,
      errorCode: result.code,
      message: result.message || 'Bad request'
    };
  }

  async updateCodeGroup(codeGroup) {
    const result = await getData(`SELECT * FROM code_group_update_fn($1, $2, $3) as query`, [
      codeGroup.sessionid,
      codeGroup.id,
      codeGroup.code
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw {
      code: 500,
      errorCode: result.code,
      message: result.message || 'Bad request'
    };
  }

  async deleteCodeGroup(codeGroup) {
    const result = await getData(`SELECT * FROM code_group_delete_fn($1, $2) as query`, [
      codeGroup.sessionid,
      codeGroup.id
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw {
      code: 500,
      errorCode: result.code,
      message: result.message || 'Bad request'
    };
  }

  async getDriver(driver) {
    const result = await getData(`SELECT * FROM driver_select_fn($1, $2::JSON, $3::JSON) as query`, [
      driver.sessionid,
      JSON.stringify(driver.groups),
      JSON.stringify(driver.vehicles)
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw {
      code: 500,
      errorCode: result.code,
      message: result.message || 'Bad request'
    };
  }

  async createDriver(driver) {
    const result = await getData(
      `SELECT * FROM driver_insert_fn($1, $2, $3, $4::JSON, $5::JSON, $6, $7, $8, $9, $10, $11::JSON) as query`,
      [
        driver.sessionid,
        driver.name,
        driver.lastName,
        driver.groups ? JSON.stringify(driver.groups) : null,
        driver.vehicles,
        driver.geotabId,
        driver.employeeNumber,
        driver.phone,
        driver.license,
        driver.email,
        JSON.stringify(driver.faces)
      ]
    );
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw {
      code: 500,
      errorCode: result.code,
      message: result.message || 'Bad request'
    };
  }

  async updateDriver(driver) {
    const result = await getData(
      `SELECT * FROM driver_update_fn($1, $2, $3, $4, $5::JSON, $6::JSON, $7, $8, $9, $10, $11, $12::JSON) as query`,
      [
        driver.sessionid,
        driver.id,
        driver.name,
        driver.lastName,
        driver.groups ? JSON.stringify(driver.groups) : null,
        driver.vehicles ? JSON.stringify(driver.vehicles) : null,
        driver.geotabId,
        driver.employeeNumber,
        driver.phone,
        driver.license,
        driver.email,
        JSON.stringify(driver.faces)
      ]
    );
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw {
      code: 500,
      errorCode: result.code,
      message: result.message || 'Bad request'
    };
  }

  async deleteDriver(driver) {
    const result = await getData(`SELECT * FROM driver_delete_fn($1, $2) as query`, [driver.sessionid, driver.id]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;
    throw {
      code: 500,
      errorCode: result.code,
      message: result.message || 'Bad request'
    };
  }

  async getTimezones({ name, code, offset, location, languageId }) {
    const result = await getData(`SELECT * FROM getTimezones($1, $2, $3, $4, $5) as query`, [
      name,
      code,
      offset,
      location,
      languageId
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;
    throw {
      code: 500,
      errorCode: result.code,
      message: result.message || 'Bad request'
    };
  }

  async getCommandTypes({ sessionid }) {
    const result = await getData(`SELECT * FROM command_type_select_fn($1) as query`, [sessionid]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getCommandsSent({ sessionid, fromDate, toDate, commandTypeIds, usernames, ruleIds }) {
    const result = await getData(
      `SELECT * FROM command_log_select_fn($1, $2, $3, $4::JSON, $5::JSON, $6::JSON) as query`,
      [
        sessionid,
        fromDate,
        toDate,
        commandTypeIds ? JSON.stringify(commandTypeIds) : '[]',
        usernames ? JSON.stringify(usernames) : '[]',
        ruleIds ? JSON.stringify(ruleIds) : '[]'
      ]
    );

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async savePowerOnOff({ geotabDeviceId, commandTypeId, dateTime, sessionId }) {
    const result = await getData(`SELECT * FROM command_log_insert_fn($1, $2, null, $4, $5) as query`, [
      commandTypeId,
      dateTime,
      sessionId,
      geotabDeviceId
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getAllVehiclesWithGeotabIdAndRec() {
    const result = await getData(`SELECT * FROM getvehiclesbytask() as query`);

    if (result.data && result.data[0] && result.data[0].query)
      return result.data[0].query.filter(
        (r) => r.geotabDeviceId !== null && r.geotabDeviceId !== '' && r.enableRecording
      );

    throw new Error(result.message);
  }

  async getCameraTypes(token) {
    const result = await getData(`SELECT * FROM camera_type_select_fn($1) as query`, [token]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async insertMdvrLogConnection(serialMDVR, dateTime, latitude, longitude, status) {
    const result = await getData(`SELECT * FROM mdvr_connection_log_insert_fn($1, $2, $3, $4, $5) as query`, [
      serialMDVR,
      dateTime,
      latitude,
      longitude,
      status
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getMdvrLogConnections(token, fromDate, toDate, serialMDVR) {
    const result = await getData(`SELECT * FROM mdvr_connection_log_select_fn($1, $2, $3, $4) as query`, [
      token,
      fromDate,
      toDate,
      serialMDVR
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async cameraAccessInsert(access) {
    const result = await getData(`SELECT * FROM camera_access_insert_fn($1::JSON) as query`, [
      access ? JSON.stringify(access) : '[]'
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getCameraAccess(fromDate, toDate, serialMDVR, isDetailed) {
    const result = await getData(`SELECT * FROM camera_access_select_fn($1, $2, $3, $4) as query`, [
      fromDate,
      toDate,
      serialMDVR,
      isDetailed
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async deleteCameraAccess(access) {
    const result = await getData(`SELECT * FROM camera_access_delete_fn($1::JSON) as query`, [
      access ? JSON.stringify(access) : '[]'
    ]);
    if (result.data && result.data[0]) return result;

    throw new Error(result.message);
  }

  async insertGeotabRule(rule) {
    const result = await getData(
      `SELECT * FROM "createGeotabRule"($1::VARCHAR, $2::VARCHAR, $3::VARCHAR, $4::INT, $5::INT, $6::TIMESTAMP(0), $7::BOOLEAN, $8::BOOLEAN, $9::BOOLEAN, $10::TEXT[], $11::BOOLEAN, $12::BOOLEAN, $13::BOOLEAN, $14::VARCHAR, $15::JSON, $16::JSON, $17::INT, $18::JSON, $19, $20, $21, $22, $23::BOOLEAN, $24::BOOLEAN, $25::VARCHAR, $26::VARCHAR, $27::VARCHAR, $28::VARCHAR) as query`,
      [
        rule.idGeotabRule,
        rule.name,
        rule.description,
        rule.secsPreEvent,
        rule.secsPosEvent,
        rule.creationDate,
        rule.isPublic,
        rule.isPopup,
        rule.isEmail,
        rule.emailList,
        rule.isActive,
        rule.gifRequired,
        rule.videoRequired,
        rule.sessionid,
        rule.idFleet ? JSON.stringify(rule.idFleet) : '[]',
        rule.idVehicle ? JSON.stringify(rule.idVehicle) : '[]',
        rule.idAlarmCategory,
        rule.cams ? JSON.stringify(rule.cams) : '[]',
        rule.zoneRestrictionIdEntry,
        rule.zoneRestrictionNameEntry,
        rule.zoneRestrictionIdExit,
        rule.zoneRestrictionNameExit,
        rule.zoneRestriction,
        rule.zoneGeofence,
        rule.zoneRuleIdEntry,
        rule.zoneRuleNameEntry,
        rule.zoneRuleIdExit,
        rule.zoneRuleNameExit
      ]
    );
    if (result.data && result.data[0]) return result.data[0].query;

    throw new Error(result.message);
  }

  async updateGeotabRule(rule) {
    const result = await getData(
      `SELECT * FROM "updateGeotabRule"($1, $2, $3, $4::JSON, $5::JSON, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16::INT, $17::JSON, $18, $19, $20, $21, $22::BOOLEAN, $23::BOOLEAN, $24::VARCHAR, $25::VARCHAR, $26::VARCHAR, $27::VARCHAR) as query`,
      [
        rule.idGeotabRuleSerial,
        rule.name,
        rule.sessionid,
        rule.idFleet ? JSON.stringify(rule.idFleet) : '[]',
        rule.idVehicle ? JSON.stringify(rule.idVehicle) : '[]',
        rule.description,
        rule.secsPreEvent,
        rule.secsPosEvent,
        rule.isPublic,
        rule.isPopup,
        rule.isActive,
        rule.gifRequired,
        rule.videoRequired,
        rule.isEmail,
        rule.emailList,
        rule.idAlarmCategory,
        rule.cams ? JSON.stringify(rule.cams) : '[]',
        rule.zoneRestrictionIdEntry,
        rule.zoneRestrictionNameEntry,
        rule.zoneRestrictionIdExit,
        rule.zoneRestrictionNameExit,
        rule.zoneRestriction,
        rule.zoneGeofence,
        rule.zoneRuleIdEntry,
        rule.zoneRuleNameEntry,
        rule.zoneRuleIdExit,
        rule.zoneRuleNameExit
      ]
    );
    console.log(result);
    if (result.data && result.data[0]) return result.data[0].query;

    throw new Error(result.message);
  }

  async deleteGeotabRule(idGeotabRuleSerial, token) {
    const result = await getData(`SELECT * FROM "deleteGeotabRule"($1, $2) as query`, [idGeotabRuleSerial, token]);
    if (result.data && result.data[0]) return result.data[0].query;

    throw new Error(result.message);
  }

  async getVehiclesByGeotabRule(idGeotabRule) {
    const result = await getData(`SELECT * FROM "getVehiclesbyGeotabRule"($1) as query`, [idGeotabRule]);

    if (result.data && result.data[0] && result.data[0].status) return result.data[0].query;

    throw new Error(result.message);
  }

  async getGeotabRule(token) {
    const result = await getData(`SELECT * FROM geotab_rules_select_fn($1) as query`, [token]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async insertGeotabAlarm(alarm) {
    const result = await getData(
      'SELECT * FROM "createGeotabAlarm"($1::VARCHAR, $2::VARCHAR, $3::VARCHAR, $4::VARCHAR, $5, $6, $7, $8::TIMESTAMP(0), $9, $10, $11, $12, $13, $14::TIMESTAMP(0), $15, $16::VARCHAR, $17) as query',
      [
        alarm.geotabGORule,
        alarm.geotabGOId,
        alarm.idDriver,
        alarm.idAlarm,
        alarm.duration,
        alarm.altitude,
        alarm.direction,
        alarm.gpsTime,
        alarm.gpsLat,
        alarm.gpsLng,
        alarm.speed,
        alarm.recordSpeed,
        alarm.state,
        alarm.creationDate,
        alarm.type,
        alarm.content,
        alarm.cmdType
      ]
    );
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async setGeotabAlarmAttended(sessionid, idsGeotab) {
    const result = await getData(`SELECT * FROM geotab_alarm_attend_multiple_fn($1, $2::JSON) as query`, [
      sessionid,
      idsGeotab ? JSON.stringify(idsGeotab) : '[]'
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async classificationAlarm(idGeotabAlarm, idClassificationMessage, sessionid, comment) {
    const result = await getData(`SELECT * FROM set_classification($1, $2, $3, $4) as query`, [
      idGeotabAlarm,
      idClassificationMessage,
      sessionid,
      comment
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getClassification(token) {
    const result = await getData(`SELECT * FROM "getClassificationMessages"($1) as query`, [token]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getCategory(token) {
    const result = await getData(`SELECT * FROM rule_category_select_fn($1) as query`, [token]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async verifiedGeotabAlarm(sessionid, idGeotabAlarm, boolvalue) {
    const result = await getData(`SELECT * FROM set_geotab_alarm_verified($1, $2, $3) as query`, [
      sessionid,
      idGeotabAlarm,
      boolvalue
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getLocationLinks({ idGeotabRule, channels, source }) {
    const result = await getData(`SELECT * FROM geotab_alarm_link_select_fn($1, $2::JSON, $3) as query`, [
      idGeotabRule,
      channels ? JSON.stringify(channels) : '[]',
      source
    ]);

    if (result.data && result.data[0] && result.status) return result.data[0].query;

    throw new Error(result.message);
  }

  async updateClassification(idClassification, idClassificationMessage, sessionid, comment) {
    const result = await getData(`SELECT * FROM update_classification($1, $2, $3, $4) as query`, [
      idClassification,
      idClassificationMessage,
      sessionid,
      comment
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getAlarmGeotabStreamax(sessionid, rulesS, vehicles, startTime, endTime, statusP, statusE, rulesG, offSet) {
    const alarms = {};
    const result = await getData(`SELECT * FROM getalarmsbyuser($1, $2, $3, $4, $5, $6, $7) as query`, [
      sessionid,
      rulesS,
      vehicles,
      startTime,
      endTime,
      statusP,
      statusE
    ]);
    if (result.data && result.data[0]) alarms.streamax = result.data;

    const result_ = await getData(
      `SELECT * FROM geotab_alarm_by_user_select_fn($1, $2, $3, $4::JSON, $5::JSON, $6) as query`,
      [
        sessionid,
        startTime,
        endTime,
        rulesG ? JSON.stringify(rulesG) : '[]',
        vehicles ? JSON.stringify(vehicles) : '[]',
        offSet
      ]
    );
    if (result_.data && result_.data[0] && result_.data[0].query) {
      alarms.geotab = result_.data[0].query.data;
      return alarms;
    }

    if (alarms.streamax || alarms.geotab) return alarms;

    throw new Error(result.message);
  }

  async uploadGeotabEvidence(geotabAlarms) {
    const result = await getData(`SELECT * FROM geotab_download_task_insert_fn($1::JSON) as query`, [
      geotabAlarms ? JSON.stringify(geotabAlarms) : '[]'
    ]);
    if (result.data && result.data[0]) return result;

    throw new Error(result.message);
  }

  async uploadStreamaxEvidence(streamaxAlarms) {
    const result = await getData(`SELECT * FROM streamax_download_task_insert_fn($1::JSON) as query`, [
      streamaxAlarms ? JSON.stringify(streamaxAlarms) : '[]'
    ]);
    if (result.data && result.data[0]) return result;

    throw new Error(result.message);
  }

  async uploadEvidence(alarmLinks) {
    const result = await getData(`SELECT * FROM task_video_data_save($1) as query`, [
      alarmLinks ? JSON.stringify(alarmLinks) : '[]'
    ]);
    if (result.data && result.data[0]) return result;

    throw new Error(result.message);
  }

  async deleteTaskId(idAlarm, taskIds, source, state, substate) {
    const result = await getData(`SELECT * FROM delete_task_id($1, $2, $3, $4, $5) as query`, [
      idAlarm,
      taskIds,
      source,
      state,
      substate
    ]);

    if (result.data && result.data[0]) return result.data[0].query;

    throw new Error(result.message);
  }

  async classificationGeotabByUser(token, alarmArr) {
    const result = await getData(`SELECT * FROM classification_geotab_insert_multiple_fn($1::TEXT, $2::JSON) as query`, [
      token,
      alarmArr ? JSON.stringify(alarmArr) : '[]'
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async classificationStreamaxByUser(token, alarmArr) {
    const result = await getData(`SELECT * FROM classification_streamax_insert_multiple_fn($1::TEXT, $2::JSON) as query`, [
      token,
      alarmArr ? JSON.stringify(alarmArr) : '[]'
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async loginSecureVideoDownload(username, password) {
    const result = await getData(`SELECT * FROM login_video_security($1, $2) as query`, [username, password]);
    if (result.data && result.data[0] && result.data[0].query) {
      if (result.data[0].query.code === 401) {
        throw { code: 401, message: 'Unauthorized' };
      }

      return result.data[0].query.data;
    }

    throw new Error(result.message);
  }

  async evidenceDownloadIdAuthorization(sessionId, downloadId) {
    const result = await getData(`SELECT * FROM check_user_alarm_permission($1, $2) as query`, [
      sessionId,
      downloadId
    ]);
    if (result.data && result.data[0] && result.data[0].query !== undefined) {
      return { isAuthorized: result.data[0].query };
    }

    result.errorCode = result.code;
    throw result;
  }

  async getComponentVehicle({ sessionid, idVehicle }) {
    const result = await getData(`SELECT * FROM get_data_by_id_go($1, $2) as query`, [sessionid, idVehicle]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async ssoLogin(params) {
    const result = await getData(`SELECT * FROM sso_login($1) as query`, params);
    if (result.data && result.data[0] && result.data[0].query) {
      if (result.data[0].query.code === 401) {
        throw { code: 401, message: 'Unauthorized' };
      }

      return result.data[0].query.data;
    }

    throw new Error(result.message);
  }

  async getDriverFT(sessionid, groups, vehicles) {
    const result = await getData(`SELECT * FROM driver_select_fn($1, $2, $3) as query`, [
      sessionid,
      groups ? JSON.stringify(groups) : '[]',
      vehicles ? JSON.stringify(vehicles) : '[]'
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;
    throw new Error(result.message);
  }

  async snapsConfig(sessionid, uniqueIds, snapCondition, intervalTime, threshold) {
    const result = await getData(`SELECT * FROM upsert_vehicle_config($1, $2, $3, $4, $5) as query`, [
      sessionid,
      uniqueIds,
      snapCondition,
      intervalTime,
      threshold,
    ]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;
    throw new Error(result.message);
  }

  async getSnapsConfig(sessionid) {
    const result = await getData(`SELECT * FROM select_vehicle_config($1) as query`, [sessionid]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;
    throw new Error(result.message);
  }

  async getSnapConfig(sessionid, serialMDVR) {
    const result = await getData(`SELECT * FROM select_vehicle_config_by_mdvr($1, $2) as query`, [sessionid, serialMDVR]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;
    throw new Error(result.message);
  }

  async createDriverFT(sessionid, name, lastName, groups, vehicles, nss, ruleId, rule, geotabId, employeeNumber, birthday, phone, license, email, faceList, ftaDriverId, profilePicture, password) {
    const result = await getData(
      `SELECT * FROM driver_insert_fn($1, $2, $3, $4::JSON, $5::JSON, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15::JSON, $16, $17, $18) as query`,
      [
        sessionid,
        name,
        lastName,
        groups ? JSON.stringify(groups) : null,
        vehicles ? JSON.stringify(vehicles) : null,
        nss,
        ruleId,
        rule,
        geotabId,
        employeeNumber ? employeeNumber : null,
        birthday ? moment.utc(birthday).format('YYYY-MM-DD') : null,
        phone,
        license,
        email,
        faceList ? JSON.stringify(faceList) : '[]',
        ftaDriverId,
        profilePicture,
        password
      ]
    );

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    return result;
  }

  async deleteDriverFT(sessionid, id) {
    const result = await getData(`SELECT * FROM driver_delete_fn($1, $2) as query`, [sessionid, id]);
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;
    throw new Error(result.message);
  }

  async updateDriverFT(sessionid, driverId, name, lastName, groups, vehicles, nss, geotabId, employeeNumber, birthday, phone, license, email, faces, password, isNewGeotabDriver) {
    const result = await getData(
      `SELECT * FROM driver_update_fn($1, $2, $3, $4, $5::JSON, $6::JSON, $7, $8, $9, $10, $11, $12, $13, $14::JSON, $15, $16) as query`,
      [
        sessionid,
        driverId,
        name,
        lastName,
        groups ? JSON.stringify(groups) : null,
        vehicles ? JSON.stringify(vehicles) : null,
        nss,
        geotabId,
        employeeNumber,
        birthday ? moment.utc(birthday).format('YYYY-MM-DD') : null,
        phone,
        license,
        email,
        JSON.stringify(faces),
        password,
        isNewGeotabDriver
      ]
    );
    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getAdvancedReport(startTime, endTime, vehicles, rules, language, offSet, drivers) {
    const result = await getData(`SELECT * FROM advanced_report_select_fn($1, $2, $3, $4, $5, $6, $7) as query`, [
      startTime,
      endTime,
      vehicles ? JSON.stringify(vehicles) : '[]',
      rules ? JSON.stringify(rules) : '[]',
      language,
      offSet,
      drivers ? JSON.stringify(drivers) : '[]'
    ]);

    if (result.data) return result.data;

    throw new Error(result.message);
  }

  async getGeotabReport(startTime, endTime, vehicles, rules, language, offSet, drivers) {
    const result = await getData(`SELECT * FROM  advanced_report_geotab_select_fn($1, $2, $3, $4, $5, $6, $7) as query`, [
      startTime,
      endTime,
      vehicles ? JSON.stringify(vehicles) : '[]',
      rules ? JSON.stringify(rules) : '[]',
      language,
      offSet,
      drivers ? JSON.stringify(drivers) : '[]'
    ]);

    if (result.data) return result.data;

    throw new Error(result.message);
  }

  async getTopDriver(token, startTime, endTime, offset) {
    const result = await getData(`SELECT * FROM drivers_top_5_fn($1, $2, $3, $4) as query`, [
      token,
      startTime,
      endTime,
      offset
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;

    throw new Error(result.message);
  }

  async getResume(token, startTime, endTime, offset) {
    const result = await getData(`SELECT * FROM dashboard_resume($1, $2, $3, $4) as query`, [
      token,
      startTime,
      endTime,
      offset
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;

    throw new Error(result.message);
  }

  async getZoomAlerts(token, driver, startDate, endDate, offset) {
    const result = await getData(`SELECT * FROM drivers_zoom($1, $2, $3, $4, $5) as query`, [
      token,
      driver,
      startDate,
      endDate,
      offset
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;

    throw new Error(result.message);
  }

  async getMdvrPerClient() {
    const result = await getData(`SELECT * FROM mdvr_per_client_select() as query`);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async loginConnectorDB(username, pass, sessionid, langid) {
    const result = await getData(`SELECT * FROM login_connector_fn($1, $2, $3, $4) as query`, [
      username,
      pass,
      sessionid,
      langid
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async checkValidTokenConnector(sessionid) {
    const result = await getData(`SELECT * FROM check_valid_token_connector($1) as query`, [sessionid]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getCamerasVehiclesForEvidence() {
    const result = await getData(`SELECT * FROM get_cameras_vehicles_for_evidence() as query`);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getEvidenceLink(streamaxIds) {
    const result = await getData(`SELECT * FROM get_evidence_link_data($1::JSON) as query`, [
      JSON.stringify(streamaxIds)
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async exceptionsLogs(data, sessionid) {
    const { status, message } = await getData(`SELECT * FROM exception_log_insert_fn($1::TEXT, $2::BIGINT[], $3::BIGINT[], $4::BIGINT[], $5::VARCHAR[], $6::VARCHAR[], $7::BOOLEAN, 
                                              $8::BOOLEAN, $9::BOOLEAN, $10::TIMESTAMP(0), $11::TIMESTAMP(0), $12::INTEGER, $13::INTEGER) AS query`, [
      
      sessionid,
      data.vehicles,
      data.rulesS,
      data.rulesG,
      data.classification,
      data.severity,
      data.evidence,
      data.isAttended,
      data.isAutomaticUpdate,
      data.startTime,
      data.endTime,
      data.limit,
      data.totalRows,
    ]);

    if (!status) throw new Error(message);
  }

  async getExceptionsLogs(data, sessionid) {
    const result = await getData('SELECT * FROM exception_log_select_fn($1::TEXT, $2::TIMESTAMP(0), $3::TIMESTAMP(0), $4::INTEGER) AS query', [
      sessionid,
      data.fromDate,
      data.toDate,
      data.offset
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;
    throw new Error(result.message);
  }

  async errorLogs(identifier, error, module) {
    const { status, message } = await getData('SELECT * FROM error_logs_fn($1, $2::JSON, $3) AS query', [
      identifier,
      error ? JSON.stringify(error) : '[]',
      module
    ]);

    if (!status) throw new Error(message);
  }

  async navigationLogs(username, module, notes, operation = 'Entró al Módulo') {
    const result = await getData(`SELECT * FROM navigation_log_insert_fn($1::VARCHAR, $2::VARCHAR, $3::VARCHAR, $4::VARCHAR) AS query`, [
      username,
      module,
      operation,
      notes
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async urlClient() {
    const result = await getData(`SELECT * FROM evidence_server_data_select_fn() AS query`);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getTaskId(idAlarm, source) {
    const result = await getData(`SELECT * FROM is_alarm_downloaded_fn($1, $2) AS query`, [
      idAlarm,
      source
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async evidenceCount(vehicles, offset) {
    const result = await getData(`SELECT * FROM evidence_count_limit_fn($1, $2) AS query`, [
      vehicles ? JSON.stringify(vehicles) : '[]',
      offset
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async insertClassificationMessage(sessionid, message, groups) {
    const result = await getData(`SELECT * FROM classification_messages_insert_fn($1, $2, $3) AS query`, [
      sessionid,
      message,
      groups ? JSON.stringify(groups) : '[]'
    ]);

    if (result.data && result.data[0] && result.data[0].query && result.data[0].query.code == 200) return result.data[0].query;

    throw {
      code: 500,
      errorCode: result.data[0].query.code,
      message: result.data[0].query.message || 'Bad request'
    };
  }

  async updateClassificationMessage(sessionid, id, message, groups) {
    const result = await getData(`SELECT * FROM classification_messages_update_fn($1, $2, $3, $4) AS query`, [
      sessionid,
      id,
      message,
      groups ? JSON.stringify(groups) : '[]'
    ]);

    if (result.data && result.data[0] && result.data[0].query && result.data[0].query.code == 200) return result.data[0].query;

    throw {
      code: 500,
      errorCode: result.data[0].query.code,
      message: result.data[0].query.message || 'Bad request'
    };
  }

  async deleteClassificationMessage(sessionid, classifications) {
    const result = await getData(`SELECT * FROM classification_messages_delete_fn($1, $2) AS query`, [
      sessionid,
      classifications ? JSON.stringify(classifications) : '[]'
    ]);

    if (result.data && result.data[0] && result.data[0].query && result.data[0].query.code == 200) return result.data[0].query;

    throw {
      code: 500,
      errorCode: result.data[0].query.code,
      message: result.data[0].query.message || 'Bad request'
    };
  }

  async getVehiclesData(sessionid, vehicles, langId, offSet) {
    const result = await getData(`SELECT * FROM select_watchdog_data_fn($1, $2, $3, $4) AS query`, [
      sessionid,
      vehicles ? JSON.stringify(vehicles) : '[]',
      langId,
      offSet
    ]);

    if (result.data && result.data[0] && result.data[0].query && result.data[0].query.code == 200) return result.data[0].query.data;

    throw {
      code: 500,
      errorCode: result.data[0].query.code,
      message: result.data[0].query.message || 'Bad request'
    };

  }

  async insertStreamaxTaskIds(streamaxAlarm) {
    const result = await getData(`SELECT * FROM streamax_download_task_insert_fn($1::JSON) as query`, [
      streamaxAlarm ? JSON.stringify(streamaxAlarm) : '[]'
    ]);
    if (result.data && result.data[0]) return result;
  }

  async associateDriverWithDownloadId(driverId, pictureId) {
    const result = await getData(`SELECT * FROM farec.set_profile_picture($1::INT, $2::VARCHAR) as query`, [
      driverId,
      pictureId
    ]);
    if (result.data && result.data[0]) return result;
  }

  async getAlarmsByUserPagination(sessionid, startTime, endTime, vehicles, rulesG, rulesS, severity, evidence, classification, offSet, rowNumber, limit, isAttended) {
    const result = await getData(`SELECT * FROM select_alarms_by_user_pagination_test($1::TEXT, $2::TIMESTAMP(0), $3::TIMESTAMP(0), $4::BIGINT[], $5::BIGINT[], $6::BIGINT[], $7::TEXT[], $8::BOOLEAN, $9::TEXT[], $10::INT, $11::INT, $12::INT, $13::BOOLEAN) as query`, [
      sessionid,
      startTime,
      endTime,
      vehicles,
      rulesG,
      rulesS,
      severity,
      evidence,
      classification,
      offSet,
      rowNumber,
      limit,
      isAttended
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async historicalDataUsage({ mdvr, date, duration }) {
    const result = await getData(`SELECT * FROM insert_data_to_download_video_historical($1,$2,$3) as query`, [
      mdvr,
      date,
      duration
    ]);

    if (result.status) return result.data[0].query;

    throw new Error(result.message);
  }

  async getHistoricalLimit({ vehicles, offset }) {
    const result = await getData(`SELECT * FROM video_download_limit_usage_fn_test($1,$2) as query`, [
      vehicles,
      offset
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;

    throw new Error(result.message);
  }

  async liveDataUsage({ mdvr, date, duration }) {
    const result = await getData(`SELECT * FROM insert_data_to_live_video_historical($1,$2,$3) as query`, [
      mdvr,
      date,
      duration
    ]);

    if (result.status) return result.data[0].query;

    throw new Error(result.message);
  }

  async getLiveLimit({ vehicles, offset }) {
    const result = await getData(`SELECT * FROM limit_live_video_usage_fn_test($1,$2) as query`, [
      vehicles,
      offset
    ]);

    if (result.data && result.data[0] && result.data[0].query) return result.data[0].query.data;

    throw new Error(result.message);
  }

  async getGroups(sessionId) {
    try {
      return await getData('SELECT * FROM getUserGroupsTree($1) AS data', [sessionId]);
    } catch (error) {
      throw error;
    }
  }

  async configDataUsage(code, update, quantity, MB, vehicles, offset) {
    const result = await getData('SELECT * FROM limit_data_usage_fn($1,$2,$3,$4,$5,$6) AS data', [
      code,
      update,
      quantity,
      MB,
      vehicles,
      offset ? offset : -6
    ]);

    if (result.data && result.data[0] && result.data[0].data) return result.data[0].data;

    throw new Error(result.message);
  }

  async groupManagement(action, sessionId, fleetId, groupName, parentFleetId, fleetStreamaxId, parentStreamaxFleetId, specialName) {
    const result = await getData('SELECT * FROM spfleet_test($1,$2,$3,$4,$5,$6,$7,$8) AS data', [
      action,
      sessionId,
      fleetId,
      groupName,
      parentFleetId,
      fleetStreamaxId,
      parentStreamaxFleetId,
      specialName
    ]);

    if (result.data && result.data[0]) return result.data[0].data;

    throw new Error(`${result.message}|${fleetStreamaxId}`);
  }

  async getStatus() {
    const result = await getData('SELECT get_current_datetime_fn() AS query');

    if (result.data && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }
  async killConnections() {
    const result = await getData('SELECT close_idle_connections() AS query');

    if (result.data && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async updateVisibilityForDinamicExceptions(sessionId, data) {
    const result = await getData('SELECT * FROM update_visibility_for_dinamic_exceptions_fn($1, $2) AS query', [
      sessionId,
      data ? JSON.stringify(data) : '[]'
    ]);

    if (result.data && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  async getCatalogue(sessionId) {
    const result = await getData('SELECT * FROM get_dinamic_exceptions_columns_by_user_language_fn($1) AS query', [
      sessionId
    ]);

    if (result.data && result.data[0]) return result;

    throw new Error(result.message);
  }

  async classificationForAllPages(sessionId, startTime, endTime, vehicles, rulesG, rulesS, dataC, offset) {
    const result = await getData('SELECT * FROM classification_for_all_pages($1::TEXT, $2::TIMESTAMP(0), $3::TIMESTAMP(0), $4::BIGINT[], $5::BIGINT[], $6::BIGINT[], $7, $8::INT) AS query', [
      sessionId,
      startTime,
      endTime,
      vehicles,
      rulesG,
      rulesS,
      dataC ? JSON.stringify(dataC) : '[]',
      offset
    ]);

    if (result.data && result.data[0]) return result;

    throw new Error(result.message);
  }

  async getVehiclesAndDriversByGroupsLevel(sessionId, idFleet) {
    const result = await getData('SELECT * FROM get_vehicles_and_drivers_by_groups_level_fn($1::TEXT, $2) AS query', [
      sessionId,
      idFleet
    ]);

    if (result.data && result.data[0].query) return result.data[0].query;

    throw new Error(result.message);
  }

  getAlarmStatusByDate = async (serials, fromDate, toDate, minRecords) => {
    try {
      const [result] = await query('SELECT * FROM get_alarm_status_by_date_range($1,$2,$3,$4) AS QUERY', [
        serials,
        fromDate,
        toDate,
        minRecords
      ]);

      return result.query;
    } catch (error) {
      throw error;
    }
  }

  getDeviceSerial = async () => {
    try {
      const [result] = await query('SELECT * FROM getDeviceSerial() AS QUERY');

      return result.query;
    } catch (error) {
      throw error;
    }
  }
}


module.exports = DBData;

/********************* Propiedad de Métrica Móvil SA de CV **************************/