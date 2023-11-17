const GroupValidator = require('../validators/group.validator');

class GroupMiddleware {
  createGroup = async (req, res, next) => {
    try {
      req.group = await GroupValidator.createGroup().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  getGroup = async (req, res, next) => {
    try {
      req.group = await GroupValidator.getGroup().validateAsync({
        ...req.params,
        ...req.query,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  updateGroup = async (req, res, next) => {
    try {
      req.group = await GroupValidator.updateGroup().validateAsync({
        ...req.body
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }

  deleteGroup = async (req, res, next) => {
    try {
      req.group = await GroupValidator.deleteGroup().validateAsync({
        ...req.params,
        ...req.query,
      });

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: error.message || error, data: null });
    }
  }
}

module.exports = new GroupMiddleware();