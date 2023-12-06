const FTAPIService = require('../services/FT_API.service');
const DBService = require('../services/database');
const dbService = new DBService();

const countChannels = (sMdvr, channels, dbAccess) => {
  let ch1 = 0, ch2 = 0, ch3 = 0, ch4 = 0, ch5 = 0, ch6 = 0, ch7 = 0, ch8 = 0, fullCh = [], availableCh = [];

  dbAccess.filter(e => e.serialMdvr === sMdvr).map(e => {
    switch (e.chnl) {
      case 1:
        ch1++;
        break;
      case 2:
        ch2++;
        break;
      case 3:
        ch3++;
        break;
      case 4:
        ch4++;
        break;
      case 5:
        ch5++;
        break;
      case 6:
        ch6++;
        break;
      case 7:
        ch7++;
        break;
      case 8:
        ch8++;
        break;

      default:
        break;
    }
  });

  const chObj = { ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8 };

  for (const key in chObj) {
    if (Object.hasOwnProperty.call(chObj, key)) {
      if (chObj[key] < 8) {
        availableCh.push(key.split('ch')[1]);
      } else {
        fullCh.push(key.split('ch')[1]);
      }
    }
  }

  const finalCh = channels.filter(e => availableCh.includes(e));

  return [finalCh, availableCh, fullCh];
}

const countMdvrAccess = (serialMdvr, dbAccess) => {
  return dbAccess.map(e => e.serialMdvr).filter(e => e === serialMdvr).reduce((a, b) => (a[b] ? a[b] += 1 : a[b] = 1, a), {})[serialMdvr] || 0;
}

const insertMdvrAccess = async (channels, message, user, serialMdvr) => {
  if (!message.includes('The device is offline')) {
    const access = channels.split(',').map(e => ({ mail: user, serialMdvr, chnl: e }));
    await dbService.cameraAccessInsert(access);
  }
}

class FTAPIController {

  async login(req, res) {
    try {
      const token = await FTAPIService.login();
      res.json({
        ok: true,
        token
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/login');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async addListDevices(req, res) {
    try {
      const { token, list } = req.device;
      const { success, message, code } = await FTAPIService.addListDevices(token, list);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/devices');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async editDevice(req, res) {
    try {
      const { token, list, uniqueId } = req.device;
      // const { success, message, code } = await FTAPIService.editDevice(token, channels, uniqueId);
      const { code, message } = await FTAPIService.deleteDevice(token, uniqueId);
      if (code !== 200) throw message;

      const { success } = await FTAPIService.addListDevices(token, list);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/device');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getListDevices(req, res) {
    try {
      const { token, onlineState, uniqueIds } = req.device;
      const { success, message, code, data } = await FTAPIService.getListDevices(token, onlineState, uniqueIds);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/devices');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getDeviceOnlineRecords(req, res) {
    try {
      const { token, startTime, endTime, uniqueIds, page, pageSize } = req.device;
      const { success, message, code, data } = await FTAPIService.getDeviceOnlineRecords(
        token,
        startTime,
        endTime,
        uniqueIds,
        page,
        pageSize
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/device-online-records');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async deleteDevice(req, res) {
    try {
      const { token, uniqueId } = req.device;
      const { success, message, code } = await FTAPIService.deleteDevice(token, uniqueId);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/device');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getSimCardImsi(req, res) {
    try {
      const { token, uniqueId } = req.device;
      const { success, message, code, data } = await FTAPIService.getSimCardImsi(token, uniqueId);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/simcard');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getLatestGpsRecord(req, res) {
    try {
      const { token, uniqueIds, vehicleIds } = req.gps;
      const { success, message, code, data } = await FTAPIService.getLatestGpsRecord(token, uniqueIds, vehicleIds);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/latest-gps-record');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getQueryGpsRecords(req, res) {
    try {
      const { token, startTime, endTime, uniqueIds, page, pageSize } = req.gps;
      const { success, message, code, data } = await FTAPIService.queryGpsRecords(
        token,
        startTime,
        endTime,
        uniqueIds,
        page,
        pageSize
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/query-gps-records');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getAlarmInformation(req, res) {
    try {
      const { token, before, processStatus, uniqueIds, page, pageSize } = req.alarm;
      const { success, message, code, data } = await FTAPIService.getAlarmInformation(
        token,
        before,
        processStatus,
        uniqueIds,
        page,
        pageSize
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/alarm');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async alarmProcession(req, res) {
    try {
      const { token, alarmIds } = req.alarm;
      const { success, message, code } = await FTAPIService.alarmProcession(token, alarmIds);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/alarm-procession');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async createAlarmFilesDownloadTask(req, res) {
    try {
      const { token, after, alarmId, before, channels, fileTypes, streamType } = req.task;
      const { success, message, code, data } = await FTAPIService.createAlarmFilesDownloadTask(
        token,
        after,
        alarmId,
        before,
        channels,
        fileTypes,
        streamType
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data || null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/alarm-files');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async createFileDownloadTask(req, res) {
    try {
      const { token, endTime, uniqueId, startTime, channels, fileTypes, streamType } = req.task;
      const { success, message, code, data } = await FTAPIService.createFileDownloadTask(
        token,
        endTime,
        uniqueId,
        startTime,
        channels,
        fileTypes,
        streamType
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/file-download-task');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getQueryTaskDownloadStatus(req, res) {
    try {
      const { token, taskIds } = req.task;

      const { success, message, code, data } = await FTAPIService.queryTaskDownloadStatus(token, taskIds);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/task-download-status');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getQueryDownloadTaskDetail(req, res) {
    try {
      const { token, taskIds } = req.task;

      const { success, message, code, data } = await FTAPIService.queryDownloadTaskDetail(token, taskIds);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/download-task-detail');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getFileDownloadLink(req, res) {
    try {
      const { token, taskIds } = req.task;

      const { success, message, code, data } = await FTAPIService.getFileDownloadLink(token, taskIds);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/file-link');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async deleteFileDownloadLink(req, res) {
    try {
      const { token, taskIds, deleteFiles } = req.task;

      const { success, message, code } = await FTAPIService.deleteFileDownloadLink(token, taskIds, deleteFiles);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/file-link');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async deleteFile(req, res) {
    try {
      const { token, fields } = req.file;
      const { success, message, code } = await FTAPIService.deleteFile(token, fields);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/file');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getDeviceLiveViewUrl(req, res) {
    try {
      const { token, user, channels, uniqueId, audio, quality, streamType, mediaType } = req.media;
      const dbAccess = await dbService.getCameraAccess();
      let cantMdvr = dbAccess.data ? countMdvrAccess(uniqueId, dbAccess.data) : 0;

      const { isMac } = req.useragent;

      if (cantMdvr > 7) {
        const [finalCh, availableCh, fullCh] = countChannels(uniqueId, channels.split(','), dbAccess.data);
        if (availableCh.length < 1) {
          return res.status(500).json({
            ok: false,
            message: 'All channels are occupied',
            data: fullCh
          });
        }

        const { success, message, code, data } = await FTAPIService.getDeviceLiveViewUrl(
          token,
          finalCh.join(','),
          uniqueId,
          audio,
          quality,
          streamType,
          isMac ? 2 : mediaType
        );

        await insertMdvrAccess(channels, message, user, uniqueId);

        return res.status(200).json({
          ok: success,
          message: `The following channels are not available: ${fullCh.join(', ') || null}`,
          secondsLeft: req.media.secondsLeft,
          data: data ? data : null,
        });
      } else {

        const { success, message, code, data } = await FTAPIService.getDeviceLiveViewUrl(
          token,
          channels,
          uniqueId,
          audio,
          quality,
          streamType,
          isMac ? 2 : mediaType
        );

        await insertMdvrAccess(channels, message, user, uniqueId);
        
        res.status(200).json({
          ok: success,
          message: message !== 'Success' ? message : undefined,
          secondsLeft: req.media.secondsLeft,
          mediaType: isMac ? 2 : mediaType,
          data: data ? data : null,
        });
      }
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/live-link');

      res.status(500).json({
        ok: false,
        message: error.message
      });
    }
  }

  async getTheMaintenancePlatformLink(req, res) {
    try {
      const { token, timeZone } = req.maintenance;
      const { success, message, code, data } = await FTAPIService.getTheMaintenancePlatformLink(token, timeZone);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/maintenance');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getInquireMonthlyCalendar(req, res) {
    try {
      const { token, uniqueId, streamType, month, storageType } = req.video;
      const { success, message, code, data } = await FTAPIService.inquireMonthlyCalendar(
        token,
        uniqueId,
        streamType,
        month,
        storageType
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/inquire-monthly-calendar');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getInquireCalendar(req, res) {
    try {
      const { token, uniqueId, streamType, channels, day, storageType } = req.video;
      const { success, message, code, data } = await FTAPIService.inquireCalendar(
        token,
        uniqueId,
        streamType,
        channels,
        day,
        storageType
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/inquire-calendar');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async subscription(req, res) {
    try {
      const { token, type, retention } = req.subscription;
      const { success, message, code } = await FTAPIService.subscription(token, type, retention);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/subscription');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async cancelSubscription(req, res) {
    try {
      const { token, type } = req.subscription;
      const { success, message, code } = await FTAPIService.cancelSubscription(token, type);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/subscription');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getRealtimeGps(req, res) {
    try {
      const { token, size } = req.subscription;
      const { success, message, code, data } = await FTAPIService.getRealtimeGps(token, size);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/realtime-gps');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getRealtimeAlarm(req, res) {
    try {
      const { token, size } = req.subscription;
      const { success, message, code, data } = await FTAPIService.getRealtimeAlarm(token, size);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/realtime-alarm');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async ttsIssue(req, res) {
    try {
      const { token, message, uniqueIds } = req.tts;
      const data = await FTAPIService.ttsIssue(token, message, uniqueIds);
      res.json({
        ok: data.success,
        message: data.message !== 'Success' ? data.message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/ttsIssue');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getTtsIssueResultQuery(req, res) {
    try {
      const { token, startTime, endTime, page, pageSize, uniqueIds } = req.tts;
      const { success, message, code, data } = await FTAPIService.ttsIssueResultQuery(
        token,
        startTime,
        endTime,
        page,
        pageSize,
        uniqueIds
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/ttsIssue');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async faceParameterConfig(req, res) {
    try {
      const { token, uniqueIds, snapCondition, intervalTime, threshold } = req.face;
      const { success, message, code } = await FTAPIService.faceParameterConfig(
        token,
        uniqueIds,
        snapCondition,
        intervalTime,
        threshold
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/face-comparison');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getFaceComparisonParameter(req, res) {
    try {
      const { token, startTime, endTime, page, pageSize, uniqueIds } = req.face;
      const { success, message, code, data } = await FTAPIService.getFaceComparisonParameter(
        token,
        startTime,
        endTime,
        page,
        pageSize,
        uniqueIds
      );
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/face-comparison-parameter');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getComparisonResult(req, res) {
    try {
      const { token, startTime, endTime, page, pageSize, result, uniqueIds } = req.face;
      let { success, message, code, data } = await FTAPIService.getComparisonResult(
        token,
        startTime,
        endTime,
        page,
        pageSize,
        result,
        uniqueIds
      );
      if (data) {
        data = [data];
        data = data.map((e) => ({
          total: e.total,
          page: e.page,
          pageSize: e.pageSize,
          list: e.list.map((o) => ({
            uniqueId: o.uniqueId,
            unknownDriver: o.result === 2 ? true : false,
            updateTime: o.updateTime,
            faceId: o.faceId,
            faceUploadState: o.faceUploadState,
            faceUrl: o.faceUrl,
            captureId: o.captureId,
            captureUploadState: o.captureUploadState,
            captureUrl: o.captureUrl,
            threshold: o.threshold
          }))
        }));
      }
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? (data.length > 0 ? data[0] : null) : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/comparison-result');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async addIssueFacePhoto(req, res) {
    try {
      const {
        token,
        uniqueIds,
        name,
        lastName,
        email,
        employeeNumber,
        license,
        phone,
        groups,
        vehicles,
        geotabId,
        faces
      } = req.face;

      const driver = {
        sessionid: req.sessionid.sessionid,
        name,
        lastName,
        groups,
        vehicles,
        geotabId,
        employeeNumber,
        phone,
        license,
        email,
        faces
      };

      const dataDB = await dbService.createDriver(driver);
      console.log(dataDB);
      if (!dataDB) {
        return res.status(424).json({
          ok: false,
          message: 'Something failed to create driver in database',
          dataDB
        });
      }

      const faceList = faces.map((e) => ({
        faceId: e.faceId,
        faceUrl: e.path
      }));
      const { success, message, code } = await FTAPIService.issueFacePhoto(token, 1, uniqueIds, faceList, 1);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/issue-face-photo');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async deleteIssueFacePhoto(req, res) {
    try {
      const { token, uniqueIds, faceList } = req.face;
      const { success, message, code } = await FTAPIService.issueFacePhoto(token, 2, uniqueIds, faceList, 2);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/issue-face-photo');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }

  async getIssueResult(req, res) {
    try {
      const { token, taskId } = req.face;
      const { success, message, code, data } = await FTAPIService.getIssueResult(token, taskId);
      res.status(code === 200 ? code : 400).json({
        ok: success,
        message: message !== 'Success' ? message : undefined,
        data: data ? data : null
      });
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/ftapi/issue-result');

      res.json({
        ok: false,
        message: error.message
      });
    }
  }
}

module.exports = new FTAPIController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/