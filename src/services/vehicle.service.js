const { query } = require('./dbconnection');

class VehicleService {
  addVehicle = async (sessionId, { idGroup, name, plate, vin, model, comments }) => {
    try {
      return await query('SELECT * FROM add_vehicle_fn($1, $2, $3, $4, $5, $6, $7) AS QUERY', [
        sessionId,
        idGroup,
        name,
        plate,
        vin,
        model,
        comments,
      ]);
    } catch (error) {
      throw error;
    }
  }

  updateVehicle = async (sessionId, { idVehicle, idGroup, name, plate, vin, model, comments }) => {
    try {
      return await query('SELECT * FROM update_vehicle_fn($1, $2, $3, $4, $5, $6, $7, $8) AS QUERY', [
        sessionId,
        idVehicle,
        idGroup,
        name,
        plate,
        vin,
        model,
        comments,
      ]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new VehicleService();