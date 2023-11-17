const CommandsRepository = require('../repositories/commands.repository');
const GeotabService = require('./geotab.service');

class CommandsService {
  getCommandTypes(command) {
    return CommandsRepository.getCommandTypes(command);
  }

  getCommandLog(command) {
    return CommandsRepository.getCommandLog(command);
  }

  async sendCommand(command) {
    const { commandTypeId, geotabDeviceId, geotabStr } = command;
    if (typeof geotabStr === 'string') throw new Error('Bad request, invalid geotabStr');

    const Geotab = new GeotabService(geotabStr);
    const commandResult = await this.getCommandResult(Geotab, commandTypeId, geotabDeviceId);
    const dbResult = await CommandsRepository.saveCommandLog({ ...command, dateTime: new Date().toISOString() });

    return { commandResult, dbResult };
  }

  getCommandResult(GeotabApi, commandTypeId, geotabDeviceId) {
    if (commandTypeId === 1) return GeotabApi.sendPowerOn(geotabDeviceId);
    if (commandTypeId === 2) return GeotabApi.sendPowerOff(geotabDeviceId);
    return null;
  }
}

module.exports = new CommandsService();

/********************* Propiedad de Métrica Móvil SA de CV **************************/