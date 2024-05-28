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

const wakeUpDevice = async (req, res) => {
	try {
		const { deviceSerial } = req.device;
		const { sessionid } = req.sessionid;
		
		const deviceState = await FTService.getDeviceDetail(deviceSerial);

		if (deviceState.code === '404') throw deviceState;

		if (deviceState.dormantState != "DORMANT") throw { code: 400, message: 'Device is not dormant.', status: false };

		const data = await FTService.wakeUpDevice(deviceSerial);
		if (data.data !== null) throw data;

		await deviceService.wakeUpDevice(sessionid, deviceSerial, true);

		handleResponseUtil(res, 200, true, 'ok', null);
	} catch (error) {
		await errorLogs('API', error, '/api/device/wakeup');
		if (error.message === 'Unknown error') error.message = 'This device cannot receive a Wake Up command at this time, try again later.'

		handleResponseUtil(res, error.code || 500, false, error.message || error, null);
	}
}

const deviceDetails = async (req, res) => {
	try {
		const { devices } = req.device;
		
		const details = await Promise.all(devices.map(async (d) => {
		const data = await FTService.getDeviceDetail(d);

			if (data.code === '404') {
				return {
					device: d,
					dormantState: null
				}
			}

			return {
				device: d,
				dormantState: data.dormantState
			};
		}));

		res.status(200).json({
			status: true,
			message: '',
			data: details
		  });
	} catch (error) {
		await errorLogs('API', error, '/api/device/wakeup');

		handleResponseUtil(res, error.code || 500, false, error.message || error, null);
	}
}

module.exports = {
	addDevice,
	updateDevice,
	deleteDevice,
	wakeUpDevice,
	deviceDetails
}