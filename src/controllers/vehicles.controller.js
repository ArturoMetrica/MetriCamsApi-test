const DBService = require('../services/database');
const promiseHandlerService = require('../services/promiseHandler.service');

const FTService = require('../services/FT_API.service');

const DbService = new DBService();

class VehicleController {
  async getGroups(req, res, next) {
    try {
      const data = await DbService.findVehicles(req.sessionid, null, req.vehicle.groupIds);
      res.status(200).json({ ok: true, data });
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/vehicles/groups');
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const [result, error] = await promiseHandlerService(await DbService.getVehicles([req.sessionid.sessionid]));

      if (error) return next(error);

      return res.status(200).json(result);
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/vehicles');
      next(error);
    }
  }

  async create(req, res, next) {

    const { token } = req.vehicle;

    let { success, message, code, data } = await FTService.addListDevices(token, [{
      channels: req.vehicle.cameras.map(camera => camera.chl).join(','),
      uniqueId: req.vehicle.serialMDVR,
    }]);

    if (!success) {
      if (code === 10028) {
        await FTService.deleteDevice(token, req.vehicle.serialMDVR);

        const result = await FTService.addListDevices(token, [{
          channels: req.vehicle.cameras.map(camera => camera.chl).join(','),
          uniqueId: req.vehicle.serialMDVR,
        }]);

        if (!result.success) {
          return res.status(400).json({
            status: false,
            message: result.message,
            data: null
          });
        }
      } else {
        return res.status(400).json({
          status: false,
          message,
          data: null
        });
      }
    }

    await FTService.changeDeviceFleet(req.vehicle.streamaxFleetId, req.vehicle.serialMDVR);

    const [result, error] = await promiseHandlerService(
      await DbService.spVehicles([
        null,
        req.vehicle.idGroup,
        req.vehicle.plate,
        req.vehicle.serial,
        req.vehicle.vin,
        req.vehicle.imei,
        req.vehicle.sim,
        req.vehicle.serialMDVR,
        req.vehicle.model,
        req.vehicle.name,
        req.vehicle.comments,
        JSON.stringify(req.vehicle.cameras),
        1,
        req.sessionid.sessionid,
        req.vehicle.geotabDeviceId,
        req.vehicle.enableRecording,
        req.vehicle.goVin,
        req.vehicle.goSerial,
      ])
    );

    if (error) {
      await DbService.errorLogs('API', error, '/api/vehicles');
      return next(error);
    }

    return res.status(200).json(result);
  }

  async update(req, res, next) {
    const deleteDevice = await FTService.deleteDevice(req.vehicle.token, req.vehicle.serialMDVR);
    const token = '';
    let { success, message, code, data } = await FTService.addListDevices(token, [{
      channels: req.vehicle.cameras.map(camera => camera.chl).join(','),
      uniqueId: req.vehicle.serialMDVR,
    }]);
    // const { success, message } = await FTService.editDevice(req.vehicle.token, req.vehicle.cameras.map(camera => camera.chl).join(','), req.vehicle.serialMDVR);

    if (!success) {
      return res.status(400).json({
        status: false,
        message,
        data: null
      });
    }

    await FTService.changeDeviceFleet(req.vehicle.streamaxFleetId, req.vehicle.serialMDVR);

    const [result, error] = await promiseHandlerService(
      await DbService.spVehicles([
        req.vehicle.id,
        req.vehicle.idGroup,
        req.vehicle.plate,
        req.vehicle.serial,
        req.vehicle.vin,
        req.vehicle.imei,
        req.vehicle.sim,
        req.vehicle.serialMDVR,
        req.vehicle.model,
        req.vehicle.name,
        req.vehicle.comments,
        JSON.stringify(req.vehicle.cameras),
        2,
        req.sessionid.sessionid,
        req.vehicle.geotabDeviceId,
        req.vehicle.enableRecording,
        req.vehicle.goVin,
        req.vehicle.goSerial,
      ])
    );

    if (error) {
      await DbService.errorLogs('API', error, '/api/vehicles');
      return next(error);
    }

    if (result.data !== null && result.status) result.data = result.data[0].data;

    return res.status(200).json(result);
  }

  async delete(req, res, next) {
    const { success, message } = await FTService.deleteDevice(req.vehicle.token, req.vehicle.serialMDVR);

    if (!success) {
      return res.status(400).json({
        status: false,
        message,
        data: null
      });
    }

    const [result, error] = await promiseHandlerService(
      DbService.spVehicles([
        req.vehicle.id,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        3,
        req.sessionid.sessionid,
        null,
        null,
        null,
        null
      ])
    );

    if (error) {
      await DbService.errorLogs('API', error, '/api/vehicles');
      return next(error);
    }

    if (result.data !== null && result.status) result.data = result.data[0].data;

    return res.status(200).json(result);
  }

  async getCameraTypes(req, res) {
    try {
      const data = await DbService.getCameraTypes(req.sessionid.sessionid)

      res.status(data.code || 400).json(data);
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/vehicles/camera-types');
      res.json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  async deleteCameraAccess(req, res) {
    try {
      const { access } = req.camera;
      const data = await DbService.deleteCameraAccess(access);

      res.status(data.status ? 200 : 400).json({
        status: true,
        message: data.status ? "Camera access removed" : "Access not eliminated",
        data: access
      });
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/vehicles/camera-access');
      res.json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  async getComponentVehicle(req, res) {
    try {
      const { code, status, message, data } = await DbService.getComponentVehicle(req.vehicle);

      res.status(code).json({
        status,
        message,
        data: data && data.length > 0 ? data : null
      })
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/component/vehicles');
      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  async getCamerasVehiclesForEvidence(req, res) {
    try {
      const data = await DbService.getCamerasVehiclesForEvidence();

      res.status(200).json({
        status: true,
        message: "",
        data
      });
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/cameras');
      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  async getCamerasVehiclesForEvidence(req, res) {
    try {
      const data = await DbService.getCamerasVehiclesForEvidence();

      res.status(200).json({
        status: true,
        message: "",
        data
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}

module.exports = new VehicleController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/