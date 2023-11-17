const SurfsightValidator = require('../validators/surfsight.validator');

class SurfsightMiddleware {
    async token(req, res, next) {
        try {
          req.token = await SurfsightValidator.token().validateAsync({
            ...req.headers
          });

          next();
        } catch (error) {
          res.json({ ok: false, message: error.message });
        }
    }

    async addMultipleDevices (req, res, next) {
        try {
          req.devices = await SurfsightValidator.addMultipleDevices().validateAsync({
              ...req.headers,
              ...req.body
          });
          
          next ();
        } catch (error) {
          res.json({ ok: false, message: error.message });
        }
    }

    async addDevice (req, res, next) {
      try {
        req.device = await SurfsightValidator.addDevice().validateAsync({
          ...req.headers,
          ...req.body
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }

    async getActiveCameras (req, res, next) {
      try {
        req.cameras = await SurfsightValidator.getActiveCameras().validateAsync({
          ...req.headers,
          ...req.query,
          ...req.params
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }

    async deviceDataUsage (req, res, next) {
      try {
        req.usage = await SurfsightValidator.deviceDataUsage().validateAsync({
          ...req.headers,
          ...req.query,
          ...req.params
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }

    async devicesDataUsage (req, res, next) {
      try {
        req.usage = await SurfsightValidator.devicesDataUsage().validateAsync({
          ...req.headers,
          ...req.query,
          ...req.params,
          ...req.body
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }

    async cameraSnapshot (req, res, next) {
      try {
        req.snap = await SurfsightValidator.cameraSnapshot().validateAsync({
          ...req.headers,
          ...req.query,
          ...req.params
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }

    async selectRecording (req, res, next) {
      try {
        req.record = await SurfsightValidator.selectRecording().validateAsync({
          ...req.headers,
          ...req.query,
          ...req.params
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }

    async getListOfAvaiableEventsMediaFiles (req, res, next) {
      try {
        req.files = await SurfsightValidator.getListOfAvaiableEventsMediaFiles().validateAsync({
          ...req.headers,
          ...req.query,
          ...req.params
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }

    async downloadEvent (req, res, next) {
      try {
        req.event = await SurfsightValidator.downloadEvent().validateAsync({
          ...req.headers,
          ...req.query,
          ...req.params
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }

    streaming = async (req, res, next) => {
      try {
        req.streaming = await SurfsightValidator.streaming().validateAsync({
          ...req.query,
        });
    
        next();
      } catch (error) {
        res.status(400).json({ status: false, message: error.message || error, data: null });
      }
    }

    async createVirtualEvent (req, res, next) {
      try {
        req.event = await SurfsightValidator.createVirtualEvent().validateAsync({
          ...req.headers,
          ...req.query,
          ...req.params
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }

    async getEventDetails (req, res, next) {
      try {
        req.event = await SurfsightValidator.getEventDetails().validateAsync({
          ...req.headers,
          ...req.query,
          ...req.params
        });

        next ();
      } catch (error) {
        res.json({ ok: false, message: error.message });
      }
    }
    
    calendar = async (req, res, next) => {
      try {
        req.calendar = await SurfsightValidator.calendar().validateAsync({
          ...req.query,
        });
    
        next();
      } catch (error) {
        res.status(400).json({ status: false, message: error.message || error, data: null });
      }
    }
    
    recording = async (req, res, next) => {
      try {
        req.recording = await SurfsightValidator.recording().validateAsync({
          ...req.query,
        });
    
        next();
      } catch (error) {
        res.status(400).json({ status: false, message: error.message || error, data: null });
      }
    }
    
}

module.exports = new SurfsightMiddleware();