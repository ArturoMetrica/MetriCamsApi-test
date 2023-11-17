const { callByUser } = require('../helpers/sso.helper')

const DBService = require('../services/database');
const DbService = new DBService();

class ExampleController {
  getVehicles = async (req, res) => {
    try {
      const { s, id } = req.vehicle;
      const user = JSON.parse(Buffer.from(s, 'base64').toString());
      const data = await callByUser(user, "Get", {
        typeName: "Device",
        search: { id }
      });

      res.status(200).json({
        status: true,
        message: '',
        data
      });
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/vehicles/geotab');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}

module.exports = new ExampleController();