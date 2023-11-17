const Validator = require('../validators/vehicle.validator');
const PromiseHandler = require('../services/promiseHandler.service');

class VehicleMiddleware {
  async getGroups(req, _, next) {
    try {
      req.vehicle = await Validator.getGroups().validateAsync({
        ...req.body,
        ...req.query,
        ...req.params
      });
      next();
    } catch (error) {
      next(error);
    }
  }

  async sessionid(req, _, next) {
    const [result, error] = await PromiseHandler(
      Validator.sessionid().validateAsync({
        ...req.body,
        ...req.query,
        ...req.params
      })
    );

    if (error) return next(error);

    req.sessionid = result;
    return next();
  }

  async get(req, _, next) {
    try {
      const [result, error] = await PromiseHandler(
        Validator.get().validateAsync({
          ...req.body,
          ...req.query,
          ...req.parmas
        })
      );

      req.vehicle = result;
      if (!result) next(error);
      else next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  middleware(validator) {
    const func = async (req, _, next) => {
      const [result, error] = await PromiseHandler(
        validator().validateAsync({
          ...req.body,
          ...req.query,
          ...req.params,
          ...req.headers
        })
      );

      if (error) return next(error);

      req.vehicle = result;
      return next();
    };

    return func;
  }

  async deleteCameraAccess(req, res, next) {
    try {
      req.camera = await Validator.deleteCameraAccess().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  async getComponentVehicle(req, res, next) {
    try {
      req.vehicle = await Validator.getComponentVehicle().validateAsync({
        ...req.query,
        ...req.headers
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
}

module.exports = new VehicleMiddleware();

/********************* Propiedad de Métrica Móvil SA de CV **************************/