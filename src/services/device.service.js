const { query } = require('./dbconnection');

const addDevice = async (token, vehicleId, deviceData, cameras) => {
	try {
		return await query('SELECT * FROM add_new_device_fn($1,$2,$3,$4) AS QUERY', [
			token,
			vehicleId,
			deviceData ? JSON.stringify(deviceData) : '[]',
			cameras ? JSON.stringify(cameras) : '[]',
		])
	} catch (error) {
		throw error;
	}
}

const updateDevice = async (token, vehicleId, deviceData, cameras) => {
	try {
		return await query('SELECT * FROM update_device_fn($1,$2,$3,$4) AS QUERY', [
			token,
			vehicleId,
			deviceData ? JSON.stringify(deviceData) : '[]',
			cameras ? JSON.stringify(cameras) : '[]',
		])
	} catch (error) {
		throw error;
	}
}

const deleteDevice = async (token, vehicleId, deviceData, cameras) => {
	try {
		return await query('SELECT * FROM delete_device_fn($1,$2,$3,$4) AS QUERY', [
			token,
			vehicleId,
			deviceData ? JSON.stringify(deviceData) : '[]',
			cameras ? JSON.stringify(cameras) : '[]',
		])
	} catch (error) {
		throw error;
	}
}

module.exports = {
	addDevice,
	updateDevice,
	deleteDevice
};