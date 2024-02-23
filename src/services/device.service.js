const { query } = require('./dbconnection');

class DeviceService {
	// CUD porque no puede obtener los datos, solo insertar, editar y eliminar
	cudDevice = async (token, { action, vehicleId, deviceData, cameras }) => {
		try {
			return await query('SELECT * FROM insert_device_data_fn($1,$2,$3,$4,$5) AS QUERY', [
				token,
				action,
				vehicleId,
				deviceData ? JSON.stringify(data) : '[]',
				cameras ? JSON.stringify(data) : '[]',
			])
		} catch (error) {
			throw error;
		}
	}


}

module.exports = new DeviceService();