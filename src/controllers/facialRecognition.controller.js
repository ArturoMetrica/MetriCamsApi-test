const ftService = require('../services/FT_API.service');
const DBService = require('../services/database');
const GeotabService = require('../services/geotab.service');
const geotabService = new GeotabService();
const config = require('../config/env').ftAPI.credentials;
const { geotab } = require('../config/env');
const { async } = require('mg-api-js');
const dbService = new DBService();
const codesService = require('../services/facial_recognition.service');
const facialRecHelper = require('../helpers/facialRec.helper');
const ftAdap = require('../services/FTAdapter.service');

class FacialRecController {
  getDriver = async (req, res) => {
    try {
      const { groups, vehicles } = req.driver, { sessionid } = req.sessionid;

      const data = await dbService.getDriverFT(sessionid, groups, vehicles);

      res.status(200).json(data);
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/facial-recognition');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getSnaps = async (req, res) => {
    try {
      const { token, startTime, endTime, page, pageSize, result, uniqueIds } = req.driver;

      const { data, message, success } = await ftService.getComparisonResult(token, startTime, endTime, page, pageSize, result, uniqueIds);

      res.status(200).json({
        status: success,
        message: message,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/facial-recognition/snaps');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getSnapConfig = async (req, res) => {
    try {
      const { uniqueId } = req.driver, { sessionid } = req.sessionid;

      const data = uniqueId ? await dbService.getSnapConfig(sessionid, uniqueId) : await dbService.getSnapsConfig(sessionid);

      res.status(200).json(data);

    } catch (error) {
      await dbService.errorLogs('API', error, '/api/facial-recognition/config');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  createDriverDB = async (req, res) => {
    try {
      const dbGroup = [];
      let geotabId = null, password = '';
      const { sessionid } = req.sessionid;
      const { name, lastName, groups, vehicles, nss, ruleId, rule, employeeNumber, birthday, phone, license, email, faceList, profilePicture, isMGDriver } = req.driver;

      if (isMGDriver === true) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 10; i++) {
          const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
          password += caracterAleatorio;
        }
      geotabId = await geotabService.addDriver(email, name, lastName, password);
    }
      const driverName = `${name} ${lastName}`;

      // Cambiar campo NSS por códigos generados desde el servicio de facial-recognition
      const driverCode = await codesService.createDriver(geotab.database);

      const fleet = await ftService.getFleetList(groups[0].group);
      if (!fleet.data.length) {
        await codesService.deleteDriver(driverCode.nss);
        await geotabService.deleteDriver(email, name, lastName, password, geotabId);
        throw 'Fleet does not exit, try again';
      }
      dbGroup.push(groups[0].groupId);

      const dataFT = await ftService.createDriverFR(driverCode.nss, driverName, fleet.data[0].fleetId);
      if (dataFT.code != 200) {
        await codesService.deleteDriver(driverCode.nss);
        await geotabService.deleteDriver(email, name, lastName, password, geotabId);
        throw { status: false, message: 'Driver creation failed. Try again', data: null };
      }

      const { data, message, status } = await dbService.createDriverFT(sessionid, name, lastName, dbGroup, vehicles, nss, ruleId, rule, geotabId, employeeNumber, birthday, phone, license, email, faceList, dataFT.data.driverId, profilePicture, password);

      if (!status) {
        await codesService.deleteDriver(driverCode.nss);
        await geotabService.deleteDriver(email, name, lastName, password, geotabId);
        await ftService.deleteDriverFR(dataFT.data.driverId);
        throw message;
      }

      res.status(200).json({
        status: true,
        message,
        data
      });

    } catch (error) {
      await dbService.errorLogs('API', error, '/api/facial-recognition/create/driver');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  createDriverFT = async (req, res) => {
    try {
      const { token, strategy, subStrategy, uniqueIds, faceList } = req.driver;
      //{ sessionid } = req.sessionid;

      const { data, message, success } = await ftService.issueFacePhoto(token, faceList, strategy, subStrategy, uniqueIds);

      if (!success) {
        return res.status(400).json({
          status: success,
          message: message,
          data: data || null
        });
      }

      // const dataDB = await dbService.createDriverFT(sessionid, name, lastName, groups, vehicles, geotabId, employeeNumber, phone, license, email, faceList);

      res.status(200).json({
        status: success,
        message,
        data
      });

    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognitionFT');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  snapsConfig = async (req, res) => {
    try {
      const { token, snapCondition, intervalTime, threshold, uniqueIds } = req.driver, { sessionid } = req.sessionid;

      const { data, message, success } = await ftService.faceParameterConfig(token, snapCondition, intervalTime, threshold, uniqueIds);

      if (!success) {
        return res.status(400).json({
          status: success,
          message: message,
          data: data || null
        });
      }

      const dataDB = await dbService.snapsConfig(sessionid, uniqueIds, snapCondition, intervalTime, threshold);

      res.status(200).json(dataDB);
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/facial-recognition/config');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  updateDriverDB = async (req, res) => {
    try {
      let password = '';
      const { idDriver, name, lastName, groups, vehicles, nss, employeeNumber, birthday, phone, license, email, faceList, isMGDriver } = req.driver, { sessionid } = req.sessionid;
      let { geotabId } = req.driver;

      if (geotabId === null) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (let i = 0; i < 10; i++) {
            const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            password += caracterAleatorio;
          }
        geotabId = await geotabService.addDriver(email, name, lastName, password);
      }

      const dataDB = await dbService.updateDriverFT(sessionid, idDriver, name, lastName, groups, vehicles, nss, geotabId, employeeNumber, birthday, phone, license, email, faceList, password, isMGDriver);

      res.status(200).json({
        status: true,
        message: dataDB.message,
        data: dataDB.data
      });

    } catch (error) {
      await dbService.errorLogs('API', error, '/api/facial-recognition/edit');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  updateDriverFT = async (req, res) => {
    try {
      const { token, strategy, subStrategy, uniqueIds, faceList } = req.driver;

      const { data, message, success } = await ftService.issueFacePhoto(token, faceList, strategy, subStrategy, uniqueIds);

      if (!success) {
        return res.status(400).json({
          status: success,
          message: message,
          data: data || null
        });
      }

      res.status(200).json({
        status: success,
        message,
        data
      });

    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognitionFT');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  deleteDriverDB = async (req, res) => {
    try {
      const { sessionid } = req.sessionid, { ftaDriverId, driverId, profilePicture } = req.driver;
      let faceFileArr = [];

      // Consultar si el conductor tiene imagenes
      const driverFaceFile = await ftService.getDriverFaceList(ftaDriverId);

      if (driverFaceFile.data.length) {

        for (let i = 0; i < driverFaceFile.data.length; i++) {
          faceFileArr.push(driverFaceFile.data[i].faceFileId);
        }
        const faceFileIds = faceFileArr.join(",");

        // Eliminar imágenes del conductor
        const delDriverPic = await ftService.deleteDriverFace(ftaDriverId, faceFileIds);
        if (delDriverPic.code !== 200) throw delDriverPic.message;

        // Eliminar imagen del Bucket
        const deleteImg = await facialRecHelper.deleteImg(profilePicture);
        if (deleteImg.data.status === true) console.log(deleteImg.data.message);
      }

      // Obtener driverCode (nss)
      const driverCode = await ftService.getDriverPage(ftaDriverId);
      const code = driverCode.data.list[0].driverCode;

      // Eliminar conductor de FT API
      const dataFT = await ftService.deleteDriverFR(ftaDriverId);
      if (dataFT.code !== 200) throw dataFT.message;

      // Eliminar conductor en DB
      const data = await dbService.deleteDriverFT(sessionid, driverId);

      // Eliminar folio del conductor
      const delDriver = await codesService.deleteDriver(code);

      res.status(200).json({
        status: true,
        message: data.message,
        data: ''
      });

    } catch (error) {
      await dbService.errorLogs('API', error, '/api/facial-recognition/delete');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  deleteDriverFT = async (req, res) => {
    try {
      const { token, faceList, strategy, subStrategy, uniqueIds } = req.driver;

      const { data, message, success } = await ftService.issueFacePhoto(token, faceList, strategy, subStrategy, uniqueIds);

      if (!success) {
        return res.status(400).json({
          status: success,
          message: message,
          data: data || null
        });
      }

      res.status(200).json({
        status: success,
        message,
        data
      });

    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognitionImgFT');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  checkStatus = async (req, res) => {
    try {
      const { token, taskId } = req.driver;

      const { data, message, success } = await ftService.getIssueResult(token, taskId);

      res.status(200).json({
        status: success,
        message,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/facial-recognition/status');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  createDriverFR = async (req, res) => {
    try {
      const { driverCode, driverName, fleetId } = req.driver;

      const { data, code, message, success } = await ftService.createDriverFR(driverCode, driverName, fleetId);

      if (code != 200) throw message;

      res.status(200).json({
        status: success,
        message,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/driver/create');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  deleteDriverFR = async (req, res) => {
    try {
      const { _sign, _tenantid, driverIds } = req.driver;

      const { data, code, message, success } = await ftService.deleteDriverFR(driverIds);

      if (code != 200) throw message;

      res.status(200).json({
        status: success,
        message,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/driver/delete');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  uploadDriverFace = async (req, res) => {
    try {
      const failPicture = [];
      let generateCode = [], deleteCodes = [];
      const { sessionid } = req.sessionid;
      const { ftaDriverId, driverId, pictureList, pictureQuantity } = req.driverFace;

      if (pictureQuantity !== 5 || pictureList.length !== 5) throw new Error('It must be 5 pictures. Try again.');

      const driverCode = await ftService.getDriverPage(ftaDriverId);
      const nssCode = driverCode.data.list[0].driverCode;

      generateCode = await codesService.generatePicturesCodes(nssCode, geotab.database, pictureQuantity);

      if (!generateCode.data.length) throw generateCode.message;

      for (let i = 0; i < pictureList.length; i++) {
        pictureList[i].pictureId = generateCode.data[i];
      }

      const { data, code, message, success } = await ftService.uploadDriverFace(ftaDriverId, pictureList);
      if (code != 200) {
        deleteCodes = await codesService.deleteDriverPicturesCodes(nssCode, geotab.database, generateCode.data);
        return res.status(500).json({
          status: false,
          message: message,
          data
        });
      }

      const dataPictures = data;

      if (data.failList.length) {
        deleteCodes = await codesService.deleteDriverPicturesCodes(nssCode, geotab.database, generateCode.data);

        if (dataPictures.successList.length) {

          for (let i = 0; i < dataPictures.successList.length; i++) {
            failPicture.push(dataPictures.successList[i].faceFileId);
          }

          const faceFile = failPicture.join(",");
          const { code, message } = await ftService.deleteDriverFace(ftaDriverId, faceFile);
          if (code != 200) throw message;
        }

        return res.status(500).json({
          status: false,
          message: '',
          data: "Driver picture no faces recognized."
        });
      }

      const driverList = await dbService.getDriverFT(sessionid);
      const profile = driverList.data.find(e => e.driverId === driverId);

      const successPictureId = data.successList[0].pictureId;
      const successPicture = pictureList.find(picture => picture.pictureId === successPictureId);
      const picture = successPicture.picture;

      if (!profile.profilePicture.length) {
        const downloadId = await facialRecHelper.uploadImg(picture);
        if (!downloadId) {
          deleteCodes = await codesService.deleteDriverPicturesCodes(nssCode, geotab.database, generateCode.data);
          return res.status(500).json({
            status: false,
            message: 'Image upload failed. Please try again later.',
            data
          });
        }
        await dbService.associateDriverWithDownloadId(driverId, downloadId);
      }

      res.status(200).json({
        status: success,
        message: `${data.successList.length} driver pictures uploaded successfully, ${data.failList.length} driver pictures failed.`,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/driver/upload');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  deleteDriverFace = async (req, res) => {
    try {
      const { ftaDriverId, driverId, profilePicture } = req.driverFace;
      const faceList = await ftService.getDriverFaceList(ftaDriverId);
      let faceFileIds = [];

      if (!faceList.data.length) throw 'Driver without assigned pictures';

      for (let i = 0; i < faceList.data.length; i++) {
        faceFileIds.push(faceList.data[i].faceFileId);
      }

      const faceFile = faceFileIds.join(",");

      const { data, code, message, success } = await ftService.deleteDriverFace(ftaDriverId, faceFile);
      if (code != 200) throw message;

      // Eliminar códigos que tiene asignados
      const driverCode = await ftService.getDriverPage(ftaDriverId);
      const ftaCode = driverCode.data.list[0].driverCode;
      const getList = await codesService.getPicturesCodes(ftaCode, geotab.database);
      const deleteCodes = await codesService.deleteDriverPicturesCodes(ftaCode, geotab.database, getList.data);

      if (deleteCodes.status !== true) throw deleteCodes.message;

      if (profilePicture) {
        // Eliminar además foto de perfil en bucket
        const deleteImg = await facialRecHelper.deleteImg(profilePicture);
        await dbService.associateDriverWithDownloadId(driverId, '');
      }

      res.status(200).json({
        status: success,
        message: 'Images deleted successfully',
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/driver/delete');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getDriverPictures = async (req, res) => {
    try {
      const { sessionid } = req.sessionid;
      // const data = [];

      const driverList = await dbService.getDriverFT(sessionid);
      const driversWithProfilePicture = driverList.data.filter(driver => driver.profilePicture);

      const data = await Promise.all(driversWithProfilePicture.map(async (driver) => {
        if (!driver.profilePicture) {
          return driver.driverId;
        }
        const imgData = await facialRecHelper.getImg(driver.profilePicture);
        // const imgBase64 = Buffer.from(imgData.data.imgBase64).toString('base64');
        const imgBase64 = imgData.data.imgBase64;
        return {
          driverId: driver.driverId,
          imgBase64
        };
      }));

      // for (let driver of driversWithProfilePicture) {
      //   const imgData = await facialRecHelper.getImg(driver.profilePicture);
      //   // const imgBase64 = Buffer.from(imgData.data.imgBase64);
      //   const imgBase64 = imgData.data.imgBase64;
      //   data.push({driverId: driver.driverId, imgBase64});
      // }

      res.status(200).json({
        status: true,
        message: 'Driver images retrieved successfully',
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error fetching driver images",
        data: null
      })
    }
  }

  getDriverFaceList = async (req, res) => {
    try {
      const { ftaDriverIds } = req.driverFace;
      const drivers = ftaDriverIds.join(",");

      const { data, code, message, success } = await ftService.getDriverFaceList(drivers);
      if (code != 200) throw 'Driver does not exist';

      const formatData = data.map(driver => { return { ftaDriverId: driver.driverId, faceFileId: driver.faceFileId, faceFileUrl: driver.faceFileUrl } });

      res.status(200).json({
        status: success,
        message,
        formatData
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/faceList');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getDriverPage = async (req, res) => {
    try {
      const { driverCode, ftaDriverIds, driverName, fleetIds, page, pageSize } = req.driverPage;

      const { data, code, message } = await ftService.getDriverPage(ftaDriverIds, driverCode, driverName, fleetIds, page, pageSize);

      if (code != 200) throw message;

      res.status(200).json({
        status: true,
        message,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/driver-page');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getDefaultFaceAuth = async (req, res) => {
    try {
      const { data, code, message, success } = await ftService.getDefaultFaceAuth();

      if (code != 200) throw message;

      res.status(200).json({
        status: success,
        message,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/auth/config');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  updateFaceAuth = async (req, res) => {
    try {
      const { bindType, fleetIds, uniqueIds, vehicleIds } = req.faceAuth;

      const { data, code, message, success } = await ftService.updateFaceAuth(bindType, fleetIds, uniqueIds, vehicleIds);

      if (code != 200) throw message;

      res.status(200).json({
        status: success,
        message,
        data
      });

    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/auth/config');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getDefaultFaceSett = async (req, res) => {
    try {
      const { data, code, message, success } = await ftService.getDefaultFaceSetting();

      if (code != 200) throw message;

      res.status(200).json({
        status: success,
        message,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/face/setting');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  updateFaceSett = async (req, res) => {
    try {
      const { accSnap, captureInterval, leaveCapture, strategyName, timedCapture } = req.faceSett;

      const { data, code, message, success } = await ftService.updateFaceSetting(accSnap, captureInterval, leaveCapture, strategyName, timedCapture);

      if (code != 200) throw message;

      res.status(200).json({
        status: success,
        message,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/setting/config');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  captureRealTime = async (req, res) => {
    try {
      const { token, channels, resolution, uniqueId } = req.capture;

      const { data, code, message, success } = await ftService.captureRealTime(token, channels, resolution, uniqueId);

      if (code != 200) throw message;

      res.status(200).json({
        status: success,
        message,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ft/facial-recognition/capture/realTime');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

}

module.exports = new FacialRecController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/