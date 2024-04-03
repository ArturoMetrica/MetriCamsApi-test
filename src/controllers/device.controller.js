const FTService = require('../services/FT_API.service');
const deviceService = require('../services/device.service');
const DBService = require('../services/database');
const { errorLogs } = new DBService();
const handleResponseUtil = require('../utils/handleResponse.util');

// module.exports = new DeviceController();
const addDevice = async (req, res) => {
	try {
		const { vehicleId, deviceData, cameras, streamaxFleetId } = req.device;
		for (let i = 0; i < deviceData.length; i++) {
			const device = deviceData[i];
			switch (device.deviceType) {
				case 1:
					await deviceService.addDevice(req.sessionid.sessionid, vehicleId, [device], cameras);
					break;
				case 2:
					const { success, message } = await FTService.addListDevices('', [{
						channels: cameras.map(camera => camera.chl).join(','),
						uniqueId: device.deviceSerial,
					}]);

					if (!success)
						return handleResponseUtil(res, 500, false, message || 'Streamax error', null);

					await FTService.changeDeviceFleet(streamaxFleetId, device.deviceSerial);

					await deviceService.addDevice(req.sessionid.sessionid, vehicleId, [device], cameras);
					break;
				case 3:
					await deviceService.addDevice(req.sessionid.sessionid, vehicleId, [device], cameras);
					break;
			}
		}

		handleResponseUtil(res, 200, true, 'ok', null);
	} catch (error) {
		await errorLogs('API', error, '/api/device');
		handleResponseUtil(res, 500, false, error.message || error, null);
	}
}

const updateDevice = async (req, res) => {
	try {
		const { vehicleId, deviceData, cameras, streamaxFleetId } = req.device;
		for (let i = 0; i < deviceData.length; i++) {
			const device = deviceData[i];
			switch (device.deviceType) {
				case 1:
					await deviceService.updateDevice(req.sessionid.sessionid, vehicleId, [device], cameras);
					break;
				case 2:
					await FTService.deleteDevice('', device.deviceSerial);

					const { success, message } = await FTService.addListDevices('', [{
						channels: cameras.map(camera => camera.chl).join(','),
						uniqueId: device.deviceSerial,
					}]);

					if (!success)
						return handleResponseUtil(res, 500, false, message || 'Streamax error', null);

					await FTService.changeDeviceFleet(streamaxFleetId, device.deviceSerial);

					await deviceService.updateDevice(req.sessionid.sessionid, vehicleId, [device], cameras);
					break;
				case 3:
					await deviceService.updateDevice(req.sessionid.sessionid, vehicleId, [device], cameras);
					break;
			}
		}

		handleResponseUtil(res, 200, true, 'ok', null);
	} catch (error) {
		await errorLogs('API', error, '/api/device');
		handleResponseUtil(res, 500, false, error.message || error, null);
	}
}

const deleteDevice = async (req, res) => {
	try {
		const { vehicleId, deviceData } = req.device;
		for (let i = 0; i < deviceData.length; i++) {
			const device = deviceData[i];
			switch (device.deviceType) {
				case 1:
					await deviceService.deleteDevice(req.sessionid.sessionid, vehicleId, [device]);
					break;
				case 2:
					await FTService.deleteDevice('', device.deviceSerial);

					await deviceService.deleteDevice(req.sessionid.sessionid, vehicleId, [device]);
					break;
				case 3:
					await deviceService.deleteDevice(req.sessionid.sessionid, vehicleId, [device]);
					break;
			}
		}

		handleResponseUtil(res, 200, true, 'ok', null);
	} catch (error) {
		await errorLogs('API', error, '/api/device');
		handleResponseUtil(res, 500, false, error.message || error, null);
	}
}

module.exports = {
	addDevice,
	updateDevice,
	deleteDevice
}