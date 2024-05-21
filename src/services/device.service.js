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

const deleteDevice = async (token, vehicleId, deviceData) => {
	try {
		return await query('SELECT * FROM delete_device_fn($1,$2,$3) AS QUERY', [
			token,
			vehicleId,
			deviceData ? JSON.stringify(deviceData) : '[]',
		])
	} catch (error) {
		throw error;
	}
}

const wakeUpDevice = async (token, deviceSerial, streamaxResponse ) => {
	try {
		const result = await query('SELECT * FROM insert_turn_on_device_in_auditlog_fn($1,$2,$3) AS QUERY', [
			token,
			deviceSerial,
			streamaxResponse
		]);

		if (result[0].query.code !== 200) throw result[0].query;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	addDevice,
	updateDevice,
	deleteDevice,
	wakeUpDevice
};