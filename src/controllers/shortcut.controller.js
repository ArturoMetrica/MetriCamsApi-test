const shortcut = require("../services/shortcut.service");
const DBService = require('../services/database');
const { errorLogs } = new DBService();
const handleResponseUtil = require('../utils/handleResponse.util');

const addShorcut = async (req, res) => {
  try {
    const { sessionid } = req.sessionid;
    const { data: params } = req.shortcut;
    const { data } = await shortcut.addShortcut(sessionid, params[0]);

    handleResponseUtil(res, 200, true, 'ok', data);
  } catch (error) {
    await errorLogs('API', error, '/api/shortcut');
    handleResponseUtil(res, 500, false, error.message || error, null);
  }
}

const updateShorcut = async (req, res) => {
  try {
    const { sessionid } = req.sessionid;
    const { data: params } = req.shortcut;
    const { data } = await shortcut.updateShortcut(sessionid, params[0]);

    handleResponseUtil(res, 200, true, 'ok', data);
  } catch (error) {
    await errorLogs('API', error, '/api/shortcut');
    handleResponseUtil(res, 500, false, error.message || error, null);
  }
}

const deleteShorcut = async (req, res) => {
  try {
    const { sessionid } = req.sessionid, { shortcut_id } = req.shortcut;
    const { data } = await shortcut.deleteShortcut(sessionid, shortcut_id);

    handleResponseUtil(res, 200, true, 'ok', data);
  } catch (error) {
    await errorLogs('API', error, '/api/shortcut');
    handleResponseUtil(res, 500, false, error.message || error, null);
  }
}

const getShortcuts = async (req, res) => {
  try {
    const { sessionid } = req.sessionid;
    const { data } = await shortcut.getShortcut(sessionid);

    handleResponseUtil(res, 200, true, 'ok', data);
  } catch (error) {
    await errorLogs('API', error, '/api/shortcut');
    handleResponseUtil(res, 500, false, error.message || error, null);
  }
}

const getShortcutFlags = async (req, res) => {
  try {
    const { data } = await shortcut.getShortcutFlags();

    handleResponseUtil(res, 200, true, 'ok', data);
  } catch (error) {
    await errorLogs('API', error, '/api/shortcut-flags');
    handleResponseUtil(res, 500, false, error.message || error, null);
  }
}

const shorcutStructure = async (req, res) => {
  try {
    const data = await shortcut.shortcutStructure();

    handleResponseUtil(res, 200, true, 'ok', data);
  } catch (error) {
    await errorLogs('API', error, '/api/shorcut');
    handleResponseUtil(res, 500, false, error.message || error, null);
  }
}

module.exports = {
  addShorcut,
  updateShorcut,
  deleteShorcut,
  getShortcuts,
  getShortcutFlags,
  shorcutStructure
}