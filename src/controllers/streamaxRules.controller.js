const DBService = require('../services/database');
const dbService = new DBService();

class StreamaxController {
  updateStreamaxRule = async (req, res) => {
    try {
      const data = await dbService.updateStreamaxRule(req.rule);

      res.status(200).json({
        code: 200,
        status: true,
        message: 'Streamax rule successfully edited',
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/rules');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  insertStreamaxTaskIds = async (req, res) => {
    try {
      const arr = [];
      arr.push(req.taskId);
      const  { data } = await dbService.insertStreamaxTaskIds(arr);

      res.status(200).json({
        code: 200,
        status: true,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/insert-taskIdStreamax');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}

module.exports = new StreamaxController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/