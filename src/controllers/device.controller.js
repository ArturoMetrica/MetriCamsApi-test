const FTService = require('../services/FT_API.service');
const deviceService = require('../services/device.service');
const DBService = require('../services/database');
const { errorLogs } = new DBService();
const handleResponseUtil = require('../utils/handleResponse.util');

class DeviceController {
	addDevice = async () => {
		try {
			const { deviceData, cameras, streamaxFleetId } = req.device;

			switch (deviceData.deviceType) {
				case 'GO':
					await deviceService.cudDevice(req.sessionid.sessionid, req.device)
					break;
				case 'MDVR':
					const { success, message } = await FTService.addListDevices('', [{
						channels: cameras.map(camera => camera.chl).join(','),
						uniqueId: deviceData.deviceSerial,
					}]);

					if (!success)
						return handleResponseUtil(res, 500, false, message || 'Streamax error', null);

					await FTService.changeDeviceFleet(streamaxFleetId, deviceData.deviceSerial);

					await deviceService.cudDevice(req.sessionid.sessionid, req.device)
					break;
				case 'LYTX':
					await deviceService.cudDevice(req.sessionid.sessionid, req.device)
					break;
				default:
					break;
			}
		} catch (error) {
			await errorLogs('API', error, '/api/device');

			handleResponseUtil(res, 500, false, error.message || error, null);
		}
	}

	updateDevice = async () => {
		try {
			const { deviceData, cameras, streamaxFleetId } = req.device;

			switch (deviceData.deviceType) {
				case 'GO':
					await deviceService.cudDevice(req.sessionid.sessionid, req.device)
					break;
				case 'MDVR':
					await FTService.deleteDevice('', deviceData.deviceSerial);

					const { success, message } = await FTService.addListDevices('', [{
						channels: cameras.map(camera => camera.chl).join(','),
						uniqueId: deviceData.deviceSerial,
					}]);

					if (!success)
						return handleResponseUtil(res, 500, false, message || 'Streamax error', null);

					await FTService.changeDeviceFleet(streamaxFleetId, deviceData.deviceSerial);

					await deviceService.cudDevice(req.sessionid.sessionid, req.device)
					break;
				case 'LYTX':
					await deviceService.cudDevice(req.sessionid.sessionid, req.device)
					break;
				default:
					break;
			}
		} catch (error) {
			await errorLogs('API', error, '/api/device');

			handleResponseUtil(res, 500, false, error.message || error, null);
		}
	}

	deleteDevice = async () => {
		try {
			const { deviceData } = req.device;

			switch (deviceData.deviceType) {
				case 'GO':
					await deviceService.cudDevice(req.sessionid.sessionid, req.device)
					break;
				case 'MDVR':
					await FTService.deleteDevice('', deviceData.deviceSerial);

					await deviceService.cudDevice(req.sessionid.sessionid, req.device)
					break;
				case 'LYTX':
					await deviceService.cudDevice(req.sessionid.sessionid, req.device)
					break;
				default:
					break;
			}
		} catch (error) {
			await errorLogs('API', error, '/api/device');

			handleResponseUtil(res, 500, false, error.message || error, null);
		}
	}
}

module.exports = new DeviceController();