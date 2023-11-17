const CommandsValidator = require('../validators/commands.validator');

class CommandsMiddleware {
  async getCommandTypes(req, res, next) {
    try {
      req.command = await CommandsValidator.getCommandTypes().validateAsync({
        ...req.body,
        ...req.query,
        ...req.params,
        sessionid: req.get('sessionid')
      });
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async getCommandLogs(req, res, next) {
    try {
      req.command = await CommandsValidator.getCommandLogs().validateAsync({
        ...req.body,
        ...req.query,
        ...req.params,
        sessionid: req.get('sessionid')
      });
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async sendCommand(req, res, next) {
    try {
      req.command = await CommandsValidator.sendCommand().validateAsync({
        ...req.body,
        ...req.query,
        ...req.params,
        sessionid: req.get('sessionid')
      });
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = new CommandsMiddleware();

/********************* Propiedad de Métrica Móvil SA de CV **************************/