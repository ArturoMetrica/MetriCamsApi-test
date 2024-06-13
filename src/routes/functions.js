const express = require('express');
const app = express();
const router = express.Router();
const validator = require('email-validator');
const moment = require('moment');

const DBService = require('../services/database');
const dbService = new DBService();

const email = require('./sendmail');

const FT_APIService = require('../services/FT_API.service');

const StreamaxRulesController = require('../controllers/streamaxRules.controller');
const StreamaxRulesMiddleware = require('../middlewares/streamaxRules.middleware');

function isDataOK(expectedKeys, receivedKeys) {
  let isOK = true;
  for (let i in expectedKeys) {
    if (typeof receivedKeys[expectedKeys[i]] === 'undefined') {
      isOK = false;
      break;
    }
  }
  return isOK;
}

router.post('/getsession', async (req, res) => {
  try {
    if (!isDataOK(['sessionid'], req.headers)) throw { message: 'Los parámetros proporcionados no son correctos' };
    let result = await dbService.getSessionData([null, req.headers.sessionid]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    // const token = await FT_APIService.login();
    // res.send({ ...result, ftApiToken: token });
    res.send({ ...result });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post('/logout', async (req, res) => {
  try {
    if (!isDataOK(['sessionid'], req.query)) throw { message: 'Los parámetros proporcionados no son correctos' };
    let result = await dbService.spLogout([req.query.sessionid]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

async function systemFuncs(data, action) {
  if (!isDataOK(['id', 'name', 'sessionId'], data.body))
    throw { message: 'Los parámetros proporcionados no son correctos' };
  if (!isDataOK(['sessionid'], data.query)) throw { message: 'Los parámetros proporcionados no son correctos' };
  let result = await dbService.spSysFunc([data.body.id, data.body.name, action, data.query.sessionid]);
  if (result.data !== null && result.status) result.data = result.data[0].data;
  return result;
}
router.post('/systemfuncs', async (req, res) => {
  try {
    let result = await systemFuncs(req, 1);
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put('/systemfuncs', async (req, res) => {
  try {
    let result = await systemFuncs(req, 2);
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete('/systemfuncs', async (req, res) => {
  try {
    if (!isDataOK(['id', 'sessionid'], req.query))
      throw { message: 'Los parámetros proporcionados no son correctos' };
    let result = await dbService.spSysFunc([req.query.id, null, 3, req.query.sessionid]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

function isEmailOK(email) {
  if (!validator.validate(email)) return { status: false, message: 'El correo no tiene el formato correcto' };
  else return { status: true, message: 'OK' };
}
router.post('/resendemail', async (request, response) => {
  try {
    if (!isDataOK(['email'], request.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    if (!isDataOK(['sessionid'], request.query))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let userCode = await dbService.getCodeForResend([request.body.email, request.query.sessionid]);
    if (userCode.data !== null) {
      if (userCode.status) await email.sendEmail(request.body.email, userCode.data[0].data);
      else throw { message: userCode.message };
    } else throw { message: userCode.message };
    response.send(true);
  } catch (error) {
    response.status(400).json(error.message);
  }
});
router.put('/resendemail', async (request, response) => {
  try {
    await email.sendEmail(request.body.email, 1234);
    response.send(true);
  } catch (error) {
    console.log(error.message);
    response.status(400).json(error.message);
  }
});

router.post('/usernew', async (request, response) => {
  let emailOK = null;
  try {
    if (!isDataOK(['email', 'idSecLevel', 'groups', 'isHistorical'], request.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    if (!isDataOK(['sessionid'], request.headers))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    emailOK = isEmailOK(request.body.email);
    if (emailOK.status) {
      try {
        if (emailOK.error) throw { status: false, message: 'El correo ingresado no es válido' };
        try {
          request.body.groups = JSON.stringify(request.body.groups);
          let resp = await dbService.spNewUser([
            request.body.email,
            request.body.groups,
            request.body.idSecLevel,
            request.headers.sessionid,
            request.body.isHistorical,
            request.body.isMetricamovil_user
          ]);
          if (resp.data !== null && resp.status) resp.data = resp.data[0].data;
          if (resp.status) {
            email.sendEmail(request.body.email, { language: { code: resp.data.code }, code: resp.data.code });
          }
          response.send(resp);
        } catch (exErr) {
          response.status(400).json(exErr.message);
        }
      } catch (error) {
        throw { message: error.message };
      }
    } else throw { message: emailOK.message };
  } catch (exErr) {
    response.status(400).json(exErr.message);
  }
});

router.post('/user/changepass/req', async (request, response) => {
  try {
    if (!isDataOK(['email'], request.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let emailOK = isEmailOK(request.body.email);
    if (emailOK.status) {
      let resp = await dbService.spChangePassReq([request.body.email]);
      if (resp.data !== null && resp.status) resp.data = resp.data[0].data;
      if (resp.status) {
        email.sendMailPass(request.body.email, { language: { code: resp.data.code }, code: resp.data.code });
      }
      response.send(resp);
    } else throw { message: emailOK.message };
  } catch (error) {
    response.status(400).json(error.message);
  }
});
router.post('/user/changepass', async (request, response) => {
  try {
    if (!isDataOK(['pass', 'code'], request.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let resp = await dbService.spChangePass([request.body.code, request.body.pass]);
    if (resp.data !== null) resp.data = resp.data[0].data;
    response.send(resp);
  } catch (error) {
    response.status(400).json(error.message);
  }
});
router.post('/usernew/register', async (request, response) => {
  try {
    if (!isDataOK(['name', 'lastName', 'pass', 'birthday', 'phone', 'email'], request.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let res = await dbService.spFinishUsers([
      '',
      request.body.name,
      request.body.lastName,
      request.body.pass,
      request.body.birthday,
      request.body.phone,
      request.body.email
    ]);
    if (res.data !== null && res.status) res.data = res.data[0].data;
    response.send(res);
  } catch (error) {
    response.status(400).json(error.message);
  }
});

router.get('/userpass/getdata', async (request, response) => {
  try {
    if (!isDataOK(['code'], request.query))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let res = await dbService.getIncompleteUserReq([request.query.code]);
    if (res.data !== null && res.status) res.data = res.data[0].data;
    response.send(res);
  } catch (error) {
    response.status(400).json(error.message);
  }
});

router.post('/user/passwordchange', async (request, response) => {
  try {
    if (!isDataOK(['email', 'password'], request.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let res = await dbService.spPassChange([request.body.email, request.body.password]);
    if (res.data !== null && res.status) res.data = res.data[0].data;
    response.send(res);
  } catch (error) {
    response.status(400).json(error.message);
  }
});

router.put('/user/changePassword', async (req, res) => {
  try {
    if (!isDataOK(['newPassword'], req.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    if (!isDataOK(['sessionid'], req.headers))
      throw { message: 'Los parámetros proporcionados no son los correctos' };

    let result = await dbService.spUserChangePassword({
      token: req.headers.sessionid,
      ...req.body
    });
    if (result.data && result.status) result.data = result.data[0].data;
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

function searchTree(node, name, desiredPath, currentPath) {
  currentPath += node.name;
  if (node.name === name) {
    if (desiredPath == currentPath) return node;
  }
  if (node.children !== null) {
    var result = null;
    for (let i = 0; result === null && i < node.children.length; i++) {
      result = searchTree(node.children[i], name, desiredPath, currentPath + '.');
    }
    return result;
  }
  return null;
}

function formatGroups(jsondata) {
  let groups = {};
  let actualNode = null;
  for (let i in jsondata) {
    let elementCount = jsondata[i].length;
    if (elementCount <= 1) {
      groups = {
        id: jsondata[i][elementCount - 1].id,
        name: jsondata[i][elementCount - 1].name,
        children: []
      };
      actualNode = groups;
    } else {
      let desiredPath = jsondata[i]
        .map((x) => x.name)
        .slice(0, -1)
        .join('.');
      actualNode = searchTree(groups, jsondata[i][elementCount - 2].name, desiredPath, '');
      actualNode.children.push({
        id: jsondata[i][elementCount - 1].id,
        name: jsondata[i][elementCount - 1].name,
        children: []
      });
    }
  }
  return groups;
}

function findChildren(g, groups) {
  return {
    ...g,
    children: groups.filter((c) => c.parentId === g.id).map((e) => findChildren(e, groups))
  };
}

function tree(groups, rootId = null) {
  const rootGroup = groups.find((g) => g.parentId === rootId);
  if (!rootGroup) return multiTree(groups);
  return findChildren(rootGroup || {}, groups);
}

function multiTree(groups) {
  const roots = groups.filter((g) => !groups.map((g) => g.id).includes(g.parentId));
  const trees = roots.map((rootGroup) => findChildren(rootGroup || {}, groups));
  return trees;
}

router.get('/usergroups', async (req, res) => {
  try {
    if (!isDataOK(['sessionid'], req.headers)) throw { message: 'Los parámetros proporcionados no son correctos' };
    let result = await dbService.getGroupsTree([req.headers.sessionid]);
    if (result.data !== null && result.status) result.data = multiTree(result.data[0].data);
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.post('/groups', async (req, res) => {
  try {
    if (!isDataOK(['idGroup', 'name', 'idParent'], req.body))
      throw { message: 'Los parámetros proporcionados no son correctos' };
    if (!isDataOK(['sessionid'], req.headers)) throw { message: 'Los parámetros proporcionados no son correctos' };
    if (!Number.isInteger(+req.body.idParent))
      throw { message: 'No son compatibles los tipos de datos proporcionados' };
    let result = await dbService.spGroups([null, req.body.name, req.body.idParent, 1, req.headers.sessionid]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.put('/groups', async (req, res) => {
  try {
    if (!isDataOK(['idGroup', 'idParent', 'name', 'sessionId'], req.body))
      throw { message: 'Los parámetros proporcionados no son correctos' };
    if (!isDataOK(['sessionid'], req.headers)) throw { message: 'Los parámetros proporcionados no son correctos' };
    if (!Number.isInteger(+req.body.idGroup))
      throw { message: 'No son compatibles los tipos de dato proporcionados' };
    let result = await dbService.spGroups([
      req.body.idGroup,
      req.body.name,
      req.body.idParent,
      2,
      req.headers.sessionid
    ]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.delete('/groups', async (req, res) => {
  try {
    if (!isDataOK(['sessionid'], req.headers))
      throw { message: 'Los parámetros proporcionados no son correctos' };
    if (!isDataOK(['idgroup', 'idparent'], req.query))
      throw { message: 'Los parámetros proporcionados no son correctos' };
    if (!Number.isInteger(+req.query.idgroup) || !Number.isInteger(+req.query.idparent))
      throw { message: 'No son compatibles los tipo de dato proporcionados' };
    let result = await dbService.spGroups([req.query.idgroup, null, req.query.idparent, 3, req.headers.sessionid]);
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

async function rules(params, action) {
  let dbPars = null;
  let res = null;
  if (action !== 3) {
    if (
      !isDataOK(
        [
          'id',
          'vehicles',
          'groups',
          'idAlarm',
          'name',
          'desc',
          'isPublic',
          'isPopup',
          'isEmail',
          'secsPre',
          'secsPos',
          'isActive',
          'emails',
          'gifRequired',
          'videoRequired',
          'alarmcategoryid',
          'zoneRestrictionIdEntry',
          'zoneRestrictionNameEntry',
          'zoneRestrictionIdExit',
          'zoneRestrictionNameExit',
          'zoneRestriction',
          'zoneGeofence',
          'zoneRuleIdEntry',
          'zoneRuleNameEntry',
          'zoneRuleIdExit',
          'zoneRuleNameExit'
        ],
        params.body
      )
    )
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    if (!isDataOK(['sessionid'], params.headers))
      throw { message: 'Los parámetros proporcionados no son correctos' };
    dbPars = [
      params.body.id,
      params.headers.sessionid,
      params.body.vehicles,
      params.body.groups,
      params.body.idAlarm,
      params.body.name,
      params.body.desc,
      params.body.isPublic,
      params.body.isPopup,
      params.body.isEmail,
      params.body.secsPre,
      params.body.secsPos,
      params.body.isActive,
      params.body.emails,
      action,
      null,
      params.body.gifRequired,
      params.body.videoRequired,
      params.body.alarmcategoryid,
      params.body.zoneRestrictionIdEntry,
      params.body.zoneRestrictionNameEntry,
      params.body.zoneRestrictionIdExit,
      params.body.zoneRestrictionNameExit,
      params.body.zoneRestriction,
      params.body.zoneGeofence,
      params.body.zoneRuleIdEntry,
      params.body.zoneRuleNameEntry,
      params.body.zoneRuleIdExit,
      params.body.zoneRuleNameExit
    ];
  } else {
    if (!isDataOK(['id'], params.query) || !isDataOK(['sessionid'], params.headers))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    dbPars = [
      params.query.id,
      params.headers.sessionid,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      action,
      null,
      false,
      false,
      null,
      null,
      null,
      null,
      null,
      false,
      false,
      '',
      '',
      '',
      ''
    ];
  }
  if (dbPars != null) res = await dbService.spRules(dbPars);
  return res;
}
router.get('/rules', async (req, res) => {
  try {
    if (!isDataOK(['sessionid'], req.headers))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let result = await dbService.getRules([req.headers.sessionid]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post('/rules', async (req, res) => {
  try {
    let data = await rules(req, 1);
    if (data.data !== null && data.status) data.data = data.data[0].data;
    res.send(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.put('/rules', StreamaxRulesMiddleware.updateStreamaxRule, StreamaxRulesController.updateStreamaxRule);

router.delete('/rules', async (req, res) => {
  try {
    let data = await rules(req, 3);
    if (data.data !== null && data.status) data.data = data.data[0].data;
    res.send(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/alarms', async (req, res) => {
  try {
    if (typeof req.query.language === 'undefined') req.query.language = null;
    let result = await dbService.getAlarmData([req.query.language]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get('/alarms/languages', async (req, res) => {
  try {
    let result = await dbService.getAlarmLanguages();
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.post('/alarms/languages', async (req, res) => {
  try {
    if (!isDataOK(['idLan', 'name'], req.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let result = await dbService.spLanguages([req.body.idLan, req.body.name, 1]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put('/alarms/languages', async (req, res) => {
  try {
    if (!isDataOK(['idLan', 'name'], req.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let result = await dbService.spLanguages([req.body.idLan, req.body.name, 2]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete('/alarms/languages', async (req, res) => {
  try {
    if (!isDataOK(['idlan'], req.query)) throw { message: 'Los parámetros proporcionados no son los correctos' };
    let result = await dbService.spLanguages([req.query.idlan, null, 3]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.post('/alarms/info', async (req, res) => {
  try {
    let data = {
      rules: null,
      vehicles: null,
      starttime: null,
      endtime: null,
      status: false
    };
    if (!isDataOK(['sessionid'], req.query))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    if (typeof req.body.rules !== 'undefined')
      if (req.body.rules !== null) if (req.body.rules.length > 0) data.rules = req.body.rules;
    if (typeof req.body.vehicles !== 'undefined')
      if (req.body.vehicles !== null) if (req.body.vehicles.length > 0) data.vehicles = req.body.vehicles;
    if (typeof req.body.starttime !== 'undefined')
      if (req.body.starttime !== null) data.starttime = moment(req.body.starttime).format('YYYY-MM-DD HH:mm:ss');
    if (typeof req.body.endtime !== 'undefined')
      if (req.body.endtime !== null) data.endtime = moment(req.body.endtime).format('YYYY-MM-DD HH:mm:ss');
    if (typeof req.body.status !== 'undefined') data.status = req.body.status;
    let result = await dbService.getAlarmsInfo([
      req.query.sessionid,
      data.rules,
      data.vehicles,
      data.starttime,
      data.endtime,
      data.status
    ]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.post('/alarms/attend', async (req, res) => {
  try {
    if (!isDataOK(['alarms', 'isAttended'], req.body))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    if (!isDataOK(['sessionid'], req.query))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let result = await dbService.spViewAlarm([req.query.sessionid, req.body.alarms, req.body.isAttended]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.post('/alarms/attend/rules', async (req, res) => {
  try {
    if (!isDataOK(['alarms'], req.body)) throw { message: 'Los parámetros proporcionados no son los correctos' };
    if (!isDataOK(['sessionid'], req.headers))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    if (req.body.alarms.length <= 0)
      throw {
        message: 'Debe de seleccionar por lo menos una alarma para atender'
      };
    let dbData = req.body.alarms.map((e) => ({
      idreceivedalarm: e.idNotify,
      idrule: e.idRule
    }));
    let result = await dbService.spViewAlarmV2([req.headers.sessionid, JSON.stringify(dbData)]);
    if (result.data !== null && result.status) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.put('/user/config', async (req, res) => {
  try {
    if (!isDataOK(['sessionid'], req.headers))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let data = {};
    if (typeof req.body.idTimezone === 'undefined') data.idTimezone = null;
    else data.idTimezone = req.body.idTimezone;
    if (typeof req.body.bannerActive === 'undefined') data.bannerActive = null;
    else data.bannerActive = req.body.bannerActive;
    if (typeof req.body.popupActive === 'undefined') data.popupActive = null;
    else data.popupActive = req.body.popupActive;
    if (typeof req.body.isSummertime === 'undefined') data.isSummertime = null;
    else data.isSummertime = req.body.isSummertime;
    if (typeof req.body.isHistorical === 'undefined') data.isHistorical = null;
    else data.isHistorical = req.body.isHistorical;
    if (typeof req.body.languageId === 'undefined') data.languageId = null;
    else data.languageId = req.body.languageId;

    let result = await dbService.spUserConfg([
      req.headers.sessionid,
      data.idTimezone,
      data.bannerActive,
      data.popupActive,
      data.isSummertime,
      data.isHistorical,
      data.languageId
    ]);
    if (result.data !== null) result.data = result.data[0].data;
    res.send({
      status: true,
      message: null,
      data: result.data
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get('/timezones', async (req, res) => {
  try {
    if (!isDataOK(['sessionid'], req.query))
      throw { message: 'Los parámetros proporcionados no son los correctos' };
    let result = await dbService.getTimezone();
    if (result.data !== null) result.data = result.data[0].data;
    res.send(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
app.use('/api', router);
module.exports = app;

/********************* Propiedad de Métrica Móvil SA de CV **************************/