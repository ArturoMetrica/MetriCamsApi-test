const { query } = require('./dbconnection');

class DeviceService {
    addDevice = async () => {
        try {
            return await query('SELECT * FROM addDevice() AS QUERY', [

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