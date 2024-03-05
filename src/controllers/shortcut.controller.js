const shorcutStructure = require("../services/shortcut.service");
const DBService = require('../services/database');
const { errorLogs } = new DBService();

class ShorcutController {
  shorcutStructure = async (req, res) => {
    try {
      const data = await shorcutStructure.shortcutStructure();

      res.status(data[0].query.code || 200).json(data[0].query);
    } catch (error) {
      await errorLogs('API', error, '/api/shorcut');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

}

module.exports = new ShorcutController();