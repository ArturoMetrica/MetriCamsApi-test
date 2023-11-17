const { async } = require("mg-api-js");
const facialRecognitionValidator = require("../validators/facialRecognition.validator");
const FacialRecValidator = require("../validators/facialRecognition.validator");
class FacialRecMiddleware {
  getDriver = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.getDriver().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });
      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  getSnaps = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.getSnaps().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  getSnapConfig = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.getSnapConfig().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });
      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  createDriverDB = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.createDriverDB().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  createDriverFT = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.createDriverFT().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  updateDriverDB = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.updateDriverDB().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  updateDriverFT = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.updateDriverFT().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });
      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  deleteDriverDB = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.deleteDriverDB().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });
      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  deleteDriverFT = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.deleteDriverFT().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });
      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
  snapsConfig = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.snapsConfig().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });
      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  checkStatus = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.checkStatus().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });
  
      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  createDriverFR = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.createDriverFR().validateAsync({
        ...req.headers,
        ...req.body
      });

      next ();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  deleteDriverFR = async (req, res, next) => {
    try {
      req.driver = await FacialRecValidator.deleteDriverFR().validateAsync({
        ...req.headers,
        ...req.body
      });

      next ();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  uploadDriverFace = async (req, res, next) => {
    try {
      req.driverFace = await FacialRecValidator.uploadDriverFace().validateAsync({
        ...req.headers,
        ...req.body
      });

      next ();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  deleteDriverFace = async (req, res, next) => {
    try {
      req.driverFace = await FacialRecValidator.deleteDriverFace().validateAsync({
        ...req.headers,
        ...req.body,
        ...req.params,
        ...req.query,
      });

      next ();
    } catch (error) {
      res.status(500).json({ status: false, message: error.message || error, data: null });
    }
  }

  getDriverFaceList = async (req, res, next) => {
    try {
      req.driverFace = await FacialRecValidator.getDriverFaceList().validateAsync({
        ...req.headers,
        ...req.body
      });

      next ();
    } catch (error) {
      res.status(500).json({ status: false, message: error.message || error, data: null });
    }
  }

  getDriverPage = async (req, res, next) => {
    try {
      req.driverPage = await FacialRecValidator.getDriverPage().validateAsync({
        ...req.headers,
        ...req.params,
        ...req.query,
        ...req.body
      });

      next ();
    } catch (error) {
      res.status(500).json({ status: false, message: error.message || error, data: null });
    }
  }

  getDefaultFaceAuth = async (req, res, next) => {
    try {
      req.faceAuth = await FacialRecValidator.getDefaultFaceAuth().validateAsync({
        ...req.headers
      });

      next ();
    } catch (error) {
      res.status(500).json({ status: false, message: error.message || error, data: null });
    }
  }

  updateFaceAuth = async (req, res, next) => {
    try {
      req.faceAuth = await FacialRecValidator.updateFaceAuth().validateAsync({
        ...req.headers,
        ...req.body
      });

      next ();
    } catch (error) {
      res.status(500).json({ status: false, message: error.message || error, data: null });
    }
  }

  getDefaultFaceSett = async (req, res, next) => {
    try {
      req.faceSett = await FacialRecValidator.getDefaultFaceSett().validateAsync({
        ...req.headers
      });

      next ();
    } catch (error) {
      res.status(500).json({ status: false, message: error.message || error, data: null });
    }
  }

  updateFaceSett = async (req, res, next) => {
    try {
      req.faceSett = await FacialRecValidator.updateFaceSetting().validateAsync({
        ...req.headers,
        ...req.body
      });

      next ();
    } catch (error) {
      res.status(500).json({ status: false, message: error.message || error, data: null });
    }
  }

  captureRealTime = async (req, res, next) => {
    try {
      req.capture = await FacialRecValidator.captureRealTime().validateAsync({
        ...req.headers,
        ...req.body
      });

      next ();
    } catch (error) {
      res.status(500).json({ status: false, message: error.message || error, data: null});
    }
  }
  
}
module.exports = new FacialRecMiddleware();

/********************* Propiedad de Métrica Móvil SA de CV **************************/