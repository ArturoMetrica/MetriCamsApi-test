const vehicleService = require("../services/vehicle.service");
const DBService = require('../services/database');
const { errorLogs } = new DBService();

class VehicleController {
  addVehicle = async (req, res) => {
    try {
      const data = await vehicleService.addVehicle(req.sessionid.sessionid, req.vehicle);

      res.status(200).json({
        status: true,
        ...data
      });
    } catch (error) {
      await errorLogs('API', error, '/api/vehicle');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}

module.exports = new VehicleController();