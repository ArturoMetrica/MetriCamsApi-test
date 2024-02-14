const { query } = require('./dbconnection');

class DeviceService {
    addDevice = async (vehicleId, deviceId, data, userLng) => {
        try {
            return await query('SELECT * FROM insert_camera_to_device_fn($1,$2,$3,$4) AS QUERY', [
                vehicleId,
                deviceId,
                data ? JSON.stringify(data) : '[]',
                userLng
            ])
        } catch (error) {
            throw error;
        }
    }

    updateDevice = async () => {
        try {
            return await query('SELECT * FROM updateDevice() AS QUERY', [

            ])
        } catch (error) {
            throw error;
        }
    }

    deleteDevice = async () => {
        try {
            return await query('SELECT * FROM deleteDevice() AS QUERY', [

            ])
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new DeviceService();