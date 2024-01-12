const { query } = require('./dbconnection');

class DeviceService {
  addDevice = async (sessionId, { idGroup, name, plate, vin, model, comments }) => {
    try {
      return await query('SELECT * FROM add_device_fn($1, $2, $3, $4, $5, $6, $7)', [
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
}

module.exports = new DeviceService();