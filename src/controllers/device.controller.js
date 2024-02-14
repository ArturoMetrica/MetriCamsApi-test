const FTService = require('../services/FT_API.service');
const deviceService = require('../services/device.service');
const DBService = require('../services/database');
const { errorLogs } = new DBService();

class DeviceController {
    addDevice = async () => {
        try {

          const { deviceId, vehicleId, dataJSON, userLng, serialMDVR, streamaxFleetId } = req.device;

          switch (deviceId) {
            case 1:
              const { success, message, code, data } = await FTService.addListDevices('',[{
                channels: dataJSON.cameras.map(camera => camera.chl).join(','),
                uniqueId: serialMDVR,
              }]);

              if (!success) {
                return res.status(400).json({
                  status: false,
                  message,
                  data: null
                });
              }

              await FTService.changeDeviceFleet(streamaxFleetId, serialMDVR);
              // await DBService.addDevice(vehicleId, deviceId, dataJSON, userLng); PENDING
              break;
            case 2:
              console.log("Hi, this is for GO device");
          
            default:
              console.log("Hi, this is for Lytx device");
              break;
          }
          
            // await FTService.changeDeviceFleet(req.vehicle.streamaxFleetId, req.vehicle.serialMDVR);

            const data = await deviceService.addDevice(req.vehicle.vehicleId, req.vehicle.deviceId, req.vehicle.data, req.vehicle.userLng);

            res.status(data[0].query.code || 200).json(data[0].query);
        } catch (error) {
            await errorLogs('API', error, '/api/device');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    updateDevice = async () => {
        try {
            const deleteDevice = await FTService.deleteDevice('', req.vehicle.serialMDVR);
            let { success, message, code, data: res } = await FTService.addListDevices('', [{
            channels: req.vehicle.cameras.map(camera => camera.chl).join(','),
            uniqueId: req.vehicle.serialMDVR,
            }]);

            if (!success) {
                return res.status(400).json({
                  status: false,
                  message,
                  data: null
                });
              }
          
            await FTService.changeDeviceFleet(req.vehicle.streamaxFleetId, req.vehicle.serialMDVR);

            const data = await deviceService.updateDevice();

            res.status(data[0].query.code || 200).json(data[0].query);
        } catch (error) {
            await errorLogs('API', error, '/api/device');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    deleteDevice = async () => {
        try {
            const { success, message } = await FTService.deleteDevice(req.vehicle.token, req.vehicle.serialMDVR);

            if (!success) {
            return res.status(400).json({
                status: false,
                message,
                data: null
            });
            }
            const data = await deviceService.deleteDevice();

            res.status(data[0].query.code || 200).json(data[0].query);
        } catch (error) {
            await errorLogs('API', error, '/api/device');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }
}

module.exports = new DeviceController();