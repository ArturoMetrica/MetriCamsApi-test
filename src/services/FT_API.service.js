const axios = require('axios').default;
const axiosRetry = require('axios-retry');

const { ftAPI } = require('../config/env');
const _sign = ftAPI.credentials._sign;
const _tenantid = ftAPI.credentials._tenantid;

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const headers = {
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  timeout: 600000
}

class FTAPIService {
  async login({ effectiveTime, identifyCode, secret } = ftAPI.credentials) {
    try {
      const {
        data: { data }
      } = await axios.post(ftAPI.baseURL + ftAPI.loginURL, {
        effectiveTime,
        identifyCode,
        secret
      });

      return data ? data.token : null;
    } catch (e) {
      return null;
    }
  }

  async addListDevices(oldToken, list) {
    try {
      const { data } = await axios.post(
        ftAPI.baseURL + ftAPI.addDevicesURL,
        {
          list
        },
        {
          headers: { _sign, _tenantid }
        }
      );

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async editDevice(toldToken, channels, uniqueId) {
    try {
      const { data } = await axios.put(
        ftAPI.baseURL + ftAPI.editDeviceURL,
        {
          channels,
          uniqueId
        },
        {
          headers: { _sign, _tenantid }
        }
      );

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getListDevices(oldToken, onlineState, uniqueId) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getListDevicesURL, {
        params: { onlineState, uniqueId },
        headers: { _sign, _tenantid }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getDeviceOnlineRecords(oldToken, startTime, endTime, uniqueIds, page, pageSize) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getDeviceOnlineRecordsURL, {
        headers: { _sign, _tenantid },
        params: {
          startTime,
          endTime,
          uniqueIds,
          page,
          pageSize
        }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async deleteDevice(oldToken, uniqueIds) {
    try {
      const { data } = await axios.delete(ftAPI.baseURL + ftAPI.deleteDeviceURL, {
        headers: { _sign, _tenantid },
        params: { uniqueIds }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getSimCardImsi(oldToken, uniqueIds) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getSimCardImsiURL, {
        headers: { _sign, _tenantid },
        params: { uniqueIds }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getLatestGpsRecord(oldToken, uniqueId, vehicleIds) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getLatestGpsRecordURL, {
        headers: { _sign, _tenantid },
        params: { uniqueId, vehicleIds }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async queryGpsRecords(oldToken, startTime, endTime, uniqueIds, page, pageSize) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.queryGpsRecordsURL, {
        headers: { _sign, _tenantid },
        params: {
          startTime,
          endTime,
          uniqueIds,
          page,
          pageSize
        }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getAlarmInformation(oldToken, before, processStatus, uniqueIds, page, pageSize) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getAlarmInformationURL, {
        headers: { _sign, _tenantid },
        params: {
          before,
          processStatus,
          uniqueIds,
          page,
          pageSize
        }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async alarmProcession(oldToken, alarmIds) {
    try {
      const { data } = await axios.put(
        ftAPI.baseURL + ftAPI.alarmProcessionURL,
        { alarmIds },
        {
          headers: { _sign, _tenantid }
        }
      );

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async createAlarmFilesDownloadTask(oldToken, after, alarmId, before, channels, fileTypes, streamType) {
    try {
      const { data } = await axios.post(
        ftAPI.baseURL + ftAPI.createAlarmFilesDownloadTaskURL,
        {
          after,
          alarmId,
          before,
          channels,
          fileTypes,
          streamType
        },
        {
          headers: { _sign, _tenantid }
        }
      );

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async createFileDownloadTask(oldToken, endTime, uniqueId, startTime, channels, fileTypes, streamType) {
    try {
      const { data } = await axios.post(
        ftAPI.baseURL + ftAPI.createFileDownloadTaskURL,
        {
          endTime,
          uniqueId,
          startTime,
          channels,
          fileTypes,
          streamType
        },
        {
          headers: { _sign, _tenantid }
        }
      );

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async queryTaskDownloadStatus(oldToken, taskIds) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.queryTaskDownloadStatusURL, {
        headers: { _sign, _tenantid },
        params: { taskIds }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async queryDownloadTaskDetail(oldToken, taskIds) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.queryDownloadTaskDetailURL, {
        headers: { _sign, _tenantid },
        params: { taskIds }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getFileDownloadLink(oldToken, taskIds) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getFileDownloadLinkURL, {
        headers: { _sign, _tenantid },
        params: { taskIds }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async deleteFileDownloadLink(oldToken, taskIds, deleteFiles) {
    try {
      const { data } = await axios.delete(ftAPI.baseURL + ftAPI.deleteFileDownloadLinkURL, {
        headers: { _sign, _tenantid },
        params: {
          taskIds,
          deleteFiles
        }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async deleteFile(oldToken, fields) {
    try {
      const { data } = await axios.delete(ftAPI.baseURL + ftAPI.deleteFileURL, {
        headers: { _sign, _tenantid },
        params: { fields }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getDeviceLiveViewUrl(oldToken, channels, uniqueId, audio, quality, streamType, mediaType) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getDeviceLiveViewUrlURL, {
        headers: { _sign, _tenantid },
        params: {
          channels,
          uniqueId,
          audio,
          quality,
          streamType,
          mediaType
        }
      });
      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async queryStreamingVideoLink(channels, uniqueId, audio, quality, streamType, streamingProtocol) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + `/openapi/v2/devices/${uniqueId}/live-links`, { // TODO: 
        headers: { _sign, _tenantid },
        params: {
          audio,
          channels,
          quality,
          streamType,
          streamingProtocol
        }
      });
      return data;
    } catch (e) {
      throw e;
    }
  }

  async getTheMaintenancePlatformLink(oldToken, timeZone) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getTheMaintenancePlatformLinkURL, {
        headers: { _sign, _tenantid },
        params: { timeZone }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async inquireMonthlyCalendar(oldToken, uniqueId, streamType, month, storageType) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.inquireMonthlyCalendarURL, {
        headers: { _sign, _tenantid },
        params: {
          uniqueId,
          streamType,
          month,
          storageType
        }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async inquireCalendar(oldToken, uniqueId, streamType, channels, day, storageType) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.inquireCalendarURL, {
        headers: { _sign, _tenantid },
        params: {
          uniqueId,
          streamType,
          channels,
          day,
          storageType
        }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async subscription(oldToken, type, retention) {
    try {
      const { data } = await axios.post(
        ftAPI.baseURL + ftAPI.subscriptionURL,
        {
          type,
          retention
        },
        {
          headers: { _sign, _tenantid }
        }
      );

      return data;
    } catch (e) {
      return null;
    }
  }

  async cancelSubscription(oldToken, type) {
    try {
      const { data } = await axios.delete(ftAPI.baseURL + ftAPI.cancelSubscriptionURL, {
        headers: { _sign, _tenantid },
        params: { type }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getRealtimeGps(oldToken, size) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getRealtimeGpsURL, {
        headers: { _sign, _tenantid },
        params: { size }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getRealtimeAlarm(oldToken, size) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getRealtimeAlarmURL, {
        headers: { _sign, _tenantid },
        params: { size }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async ttsIssue(oldToken, message, uniqueIds) {
    try {
      const { data } = await axios.post(
        ftAPI.baseURL + ftAPI.ttsIssueURL,
        {
          message,
          uniqueIds
        },
        {
          headers: { _sign, _tenantid }
        }
      );

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async ttsIssueResultQuery(oldToken, startTime, endTime, page, pageSize, uniqueIds) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.ttsIssueResultQueryURL, {
        headers: { _sign, _tenantid },
        params: {
          startTime,
          endTime,
          page,
          pageSize,
          uniqueIds
        }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async faceParameterConfig(oldToken, snapCondition, intervalTime, threshold, uniqueIds) {
    try {
      const { data } = await axios.put(
        ftAPI.baseURL + ftAPI.faceParameterConfigURL,
        {
          uniqueIds,
          snapCondition,
          intervalTime,
          threshold
        },
        {
          headers: { _sign, _tenantid }
        }
      );

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getFaceComparisonParameter(oldToken, startTime, endTime, page, pageSize, uniqueIds) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getFaceComparisonParameterURL, {
        headers: { _sign, _tenantid },
        params: {
          startTime,
          endTime,
          page,
          pageSize,
          uniqueIds
        }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async getComparisonResult(oldToken, startTime, endTime, page, pageSize, result, uniqueIds) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getComparisonResultURL, {
        headers: { _sign, _tenantid },
        params: {
          startTime,
          endTime,
          page,
          pageSize,
          result,
          uniqueIds
        }
      });

      return data ? data : null;
    } catch (e) {
      return null;
    }
  }

  async issueFacePhoto(oldToken, faceList, strategy, subStrategy, uniqueIds) {
    try {
      const { data } = await axios.put(
        ftAPI.baseURL + ftAPI.issueFacePhotoURL,
        {
          strategy,
          uniqueIds,
          faceList,
          subStrategy
        },
        {
          headers: { _sign, _tenantid }
        }
      );

      return data;
    } catch (e) {
      return null;
    }
  }

  async getIssueResult(oldToken, taskId) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getIssueResultURL, {
        headers: { _sign, _tenantid },
        params: { taskId }
      });

      return data;
    } catch (e) {
      return null;
    }
  }

  async getMonthlyCalendar(oldToken, uniqueId, streamType, month, storageType, timeZoneOffset) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.inquireMonthlyCalendarURL, {
        headers: { _sign, _tenantid },
        params: { uniqueId, streamType, month, storageType, timeZoneOffset }
      });

      return data;
    } catch (e) {
      return null;
    }
  }

  async getDailyCalendar(oldToken, uniqueId, streamType, channels, day, storageType, timeZoneOffset) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.inquireDailyCalendarURL, {
        headers: { _sign, _tenantid },
        params: { uniqueId, streamType, channels, day, storageType, timeZoneOffset }
      });

      return data;
    } catch (error) {
      return null;
    }
  }

  async getMinuteCalendar(oldToken, uniqueId, streamType, channels, startTime, endTime, storageType) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.inquireMinuteCalendarURL, {
        headers: { _sign, _tenantid },
        params: { uniqueId, streamType, channels, startTime, endTime, storageType }
      });

      return data;
    } catch (e) {
      return null;
    }
  }

  async createDriverFR(driverCode, driverName, fleetId) {
    try {
      // Dentro de data hay un campo llamado driverId, es el valor de 19 digitos que espero recibir
      const { data } = await axios.post(ftAPI.baseURL + ftAPI.createDriver,
        {
          driverCode,
          driverName,
          fleetId
        },
        {
          headers: { _sign, _tenantid },
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async deleteDriverFR(driverIds) {
    try {
      const { data } = await axios.post(ftAPI.baseURL + ftAPI.deleteDriver,
        {
          driverIds
        },
        {
          headers: { _sign, _tenantid },
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async uploadDriverFace(driverId, pictureList) {
    try {
      const { data } = await axios.post(ftAPI.baseURL + ftAPI.uploadDriverFace,
        {
          driverId,
          pictureList
        },
        {
          headers: { _sign, _tenantid },
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async deleteDriverFace(driverId, faceFileIds) {
    try {
      const { data } = await axios.post(ftAPI.baseURL + ftAPI.deleteDriverFace,
        {
          driverId,
          faceFileIds
        },
        {
          headers: { _sign, _tenantid },
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async getDriverFaceList(driverIds) {
    try {
      const { data } = await axios.post(ftAPI.baseURL + ftAPI.getDriverFaceList,
        {
          driverIds
        },
        {
          headers: { _sign, _tenantid },
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async getDriverPage(driverIds, driverCode, driverName, fleetIds, page, pageSize) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getDriverPage, {
        headers: { _sign, _tenantid },
        params: { driverIds, driverCode, driverName, fleetIds, page, pageSize }
      });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async getDefaultFaceAuth() {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.faceAuth,
        {
          headers: { _sign, _tenantid },
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async updateFaceAuth(bindType, fleetIds, uniqueIds, vehicleIds) {
    try {
      const { data } = await axios.post(ftAPI.baseURL + ftAPI.faceAuth,
        {
          bindType,
          fleetIds,
          uniqueIds,
          vehicleIds
        },
        {
          headers: { _sign, _tenantid }
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async getDefaultFaceSetting() {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.faceSetting,
        {
          headers: { _sign, _tenantid }
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async updateFaceSetting(accSnap, captureInterval, leaveCapture, strategyName, timedCapture) {
    try {
      const { data } = await axios.post(ftAPI.baseURL + ftAPI.faceSetting,
        {
          accSnap,
          captureInterval,
          leaveCapture,
          strategyName,
          timedCapture
        },
        {
          headers: { _sign, _tenantid }
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async captureRealTime(oldToken, channels, resolution, uniqueId) {
    try {
      const { data } = await axios.post(ftAPI.baseURL + ftAPI.captureRealTime,
        {
          uniqueId,
          channels,
          resolution
        },
        {
          headers: { _sign, _tenantid }
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async createFleet(fleetName, parentFleetId) {
    try {
      const { data } = await axios.post(ftAPI.baseURL + ftAPI.createFleet,
        {
          fleetName,
          parentFleetId
        },
        {
          headers: { _sign, _tenantid }
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async deleteFleet(fleetId) {
    try {
      const { data } = await axios.delete(ftAPI.baseURL + ftAPI.deleteFleet + fleetId,
        {
          headers: { _sign, _tenantid }
        });
      console.log('object');
      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async updateFleet(fleetName, parentFleetId, fleetId) {
    try {
      const { data } = await axios.patch(ftAPI.baseURL + ftAPI.updateFleet + fleetId,
        {
          fleetName,
          parentFleetId
        },
        {
          headers: { _sign, _tenantid }
        });

      console.log('object');
      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async getFleetList(fleetName, page, pageSize, parentFleetId) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getFleetList,
        {
          params: { fleetName, page, pageSize, parentFleetId },
          headers: { _sign, _tenantid }
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async changeDeviceFleet(fleetId, uniqueIds) {
    try {
      const { data } = await axios.patch(ftAPI.baseURL + ftAPI.changeDeviceFleet,
        {
          fleetId,
          uniqueIds
        },
        {
          headers: { _sign, _tenantid }
        });

      return data ? data : null;
    } catch (error) {
      return null;
    }
  }

  async getDeviceDetail (uniqueId) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getDeviceDetail + `${uniqueId}`,
      {
        headers: { _sign, _tenantid }
      });

      return data.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async getDevicesDetail (page) {
    try {
      const { data } = await axios.get(ftAPI.baseURL + ftAPI.getDeviceDetail,
      {
        params: { page, pageSize: 1000 },
        headers: { _sign, _tenantid }
      });

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async wakeUpDevice (uniqueId) {
    try {
      const data = await axios.post(ftAPI.baseURL + ftAPI.wakeUpDevice + `${uniqueId}/wakeup`,
      null,
        { headers: { _sign, _tenantid }
      });

      return data.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async historyStreamingVideo (uniqueId, channels, endTime, startTime, storeType, streamType, streamingProtocol) {
    try {
      const data = await axios.get(ftAPI.baseURL + ftAPI.historyStreamingVideo + `${uniqueId}/playback-links`,
        {
          params: { channels, endTime, startTime, storeType, streamType, streamingProtocol },
          headers: { _sign, _tenantid }
        });

        return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async stopDeviceStreaming (session) {
    try {
      const data = await axios.post(ftAPI.baseURL + ftAPI.stopDeviceStreaming,
        {
          session
        },
        {
          headers: { _sign, _tenantid}
        });

        return data;
    } catch (error) {
      return error.response.data;
    }
  }

}

module.exports = new FTAPIService();

/********************* Propiedad de Métrica Móvil SA de CV **************************/