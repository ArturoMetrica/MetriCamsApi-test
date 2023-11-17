const FTAPIValidator = require("../validators/FT_API.validator");
const DBService = require("../services/database");
const { checkValidToken } = new DBService();

class FTAPIMiddleware {
  async sessionId(req, res, next) {
    try {
      req.sessionid = 'TOKEN'
      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async addListDevices(req, res, next) {
    try {
      req.device = await FTAPIValidator.addListDevices().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async editDevice(req, res, next) {
    try {
      req.device = await FTAPIValidator.editDevice().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getListDevices(req, res, next) {
    try {
      req.device = await FTAPIValidator.getListDevices().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getDeviceOnlineRecords(req, res, next) {
    try {
      req.device = await FTAPIValidator.getDeviceOnlineRecords().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async deleteDevice(req, res, next) {
    try {
      req.device = await FTAPIValidator.deleteDevice().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getSimCardImsi(req, res, next) {
    try {
      req.device = await FTAPIValidator.getSimCardImsi().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getLatestGpsRecord(req, res, next) {
    try {
      req.gps = await FTAPIValidator.getLatestGpsRecord().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getQueryGpsRecords(req, res, next) {
    try {
      req.gps = await FTAPIValidator.getQueryGpsRecords().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getAlarmInformation(req, res, next) {
    try {
      req.alarm = await FTAPIValidator.getAlarmInformation().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async alarmProcession(req, res, next) {
    try {
      req.alarm = await FTAPIValidator.alarmProcession().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async createAlarmFilesDownloadTask(req, res, next) {
    try {
      req.task = await FTAPIValidator.createAlarmFilesDownloadTask().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async createFileDownloadTask(req, res, next) {
    try {
      req.task = await FTAPIValidator.createFileDownloadTask().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getQueryTaskDownloadStatus(req, res, next) {
    try {
      req.task = await FTAPIValidator.getQueryTaskDownloadStatus().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getQueryDownloadTaskDetail(req, res, next) {
    try {
      req.task = await FTAPIValidator.getQueryDownloadTaskDetail().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getFileDownloadLink(req, res, next) {
    try {
      req.task = await FTAPIValidator.getFileDownloadLink().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async deleteFileDownloadLink(req, res, next) {
    try {
      req.task = await FTAPIValidator.deleteFileDownloadLink().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async deleteFile(req, res, next) {
    try {
      req.file = await FTAPIValidator.deleteFile().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getDeviceLiveViewUrl(req, res, next) {
    try {
      req.media = await FTAPIValidator.getDeviceLiveViewUrl().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getTheMaintenancePlatformLink(req, res, next) {
    try {
      req.maintenance = await FTAPIValidator.getTheMaintenancePlatformLink().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getInquireMonthlyCalendar(req, res, next) {
    try {
      req.video = await FTAPIValidator.getInquireMonthlyCalendar().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getInquireCalendar(req, res, next) {
    try {
      req.video = await FTAPIValidator.getInquireCalendar().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async subscription(req, res, next) {
    try {
      req.subscription = await FTAPIValidator.subscription().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async cancelSubscription(req, res, next) {
    try {
      req.subscription = await FTAPIValidator.cancelSubscription().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getRealtimeGps(req, res, next) {
    try {
      req.subscription = await FTAPIValidator.getRealtimeGps().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getRealtimeAlarm(req, res, next) {
    try {
      req.subscription = await FTAPIValidator.getRealtimeAlarm().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async ttsIssue(req, res, next) {
    try {
      req.tts = await FTAPIValidator.ttsIssue().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getTtsIssueResultQuery(req, res, next) {
    try {
      req.tts = await FTAPIValidator.getTtsIssueResultQuery().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async faceParameterConfig(req, res, next) {
    try {
      req.face = await FTAPIValidator.faceParameterConfig().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getFaceComparisonParameter(req, res, next) {
    try {
      req.face = await FTAPIValidator.getFaceComparisonParameter().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getComparisonResult(req, res, next) {
    try {
      req.face = await FTAPIValidator.getComparisonResult().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async addIssueFacePhoto(req, res, next) {
    try {
      req.face = await FTAPIValidator.addIssueFacePhoto().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async deleteIssueFacePhoto(req, res, next) {
    try {
      req.face = await FTAPIValidator.deleteIssueFacePhoto().validateAsync({
        ...req.headers,
        ...req.body
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getIssueResult(req, res, next) {
    try {
      req.face = await FTAPIValidator.getIssueResult().validateAsync({
        ...req.headers,
        ...req.query,
      });

      next();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getMonthlyCalendar(req, res, next) {
    try {
      req.calendar = await FTAPIValidator.getMonthlyCalendar().validateAsync({
        ...req.headers,
        ...req.query
      });

      next ();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getDailyCalendar(req, res, next) {
    try {
      req.calendar = await FTAPIValidator.getDailyCalendar().validateAsync({
        ...req.headers,
        ...req.query
      });

      next ();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }

  async getMinuteCalendar(req, res, next) {
    try {
      req.calendar = await FTAPIValidator.getMinuteCalendar().validateAsync({
        ...req.headers,
        ...req.query
      });

      next ();
    } catch (error) {
      res.json({ ok: false, message: error.message });
    }
  }
}

module.exports = new FTAPIMiddleware();

/********************* Propiedad de Métrica Móvil SA de CV **************************/