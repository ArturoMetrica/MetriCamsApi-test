const DBService = require('../services/database');

const dbService = new DBService();

class CommandsRepository {
  getCommandTypes({ sessionid }) {
    return dbService.getCommandTypes({ sessionid });
  }

  getCommandLog(command) {
    return dbService.getCommandsSent(command);
  }

  getAllDevices() {
    return dbService.getAllDevices();
  }

  saveCommandLog(command) {
    return dbService.savePowerOnOff(command);
  }
}

module.exports = new CommandsRepository();

/********************* Propiedad de Métrica Móvil SA de CV **************************/