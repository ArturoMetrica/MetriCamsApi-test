const DBService = require('../services/database');
const dbService = new DBService();

class Controller {
  status = async (req, res) => {
    try {
      const data = await dbService.getStatus();

      res.status(200).json({
        status: true,
        message: 'Normal',
        data
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Anormal',
        data: null
      });
    }
  }

  killConnections = async (req, res) => {
    try {
      const message = await dbService.killConnections();

      res.status(200).json({
        status: true,
        message: `killed connections: ${message.split(': ')[1]}`,
        data: null
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

}

module.exports = new Controller();