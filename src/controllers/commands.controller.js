const CommandsService = require('../services/commands.service');

const DBService = require('../services/database');
const DbService = new DBService();

class CommandsController {
  async getCommandTypes(req, res, next) {
    try {
      const result = await CommandsService.getCommandTypes(req.command);
      res.status(200).json(result);
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/commands/types');

      next(error);
    }
  }

  async getCommandLogs(req, res, next) {
    try {
      const result = await CommandsService.getCommandLog(req.command);
      res.status(200).json(result);
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/commands');

      next(error);
    }
  }

  async sendCommand(req, res, next) {
    try {
      const result = await CommandsService.sendCommand(req.command);
      res.status(200).json(result);
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/command/send');

      next(error);
    }
  }
}

module.exports = new CommandsController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/