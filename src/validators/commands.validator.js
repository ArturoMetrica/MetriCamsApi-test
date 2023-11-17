const Joi = require('joi');

class CommandsValidator {
  getCommandTypes() {
    return Joi.object().keys({
      sessionid: Joi.string().required()
    });
  }

  sendCommand() {
    return Joi.object().keys({
      sessionid: Joi.string().required(),
      commandTypeId: Joi.string().required(),
      geotabDeviceId: Joi.string().required(),
      geotabStr: Joi.string()
        .base64()
        .custom((str) => {
          try {
            const _json = JSON.parse(Buffer.from(str, 'base64').toString());
            const { sessionId, server, database, userName, username } = _json;
            if (!sessionId || !server || !database || !(username || userName)) {
              throw Error('Invalid Base64 JSON String');
            }

            return _json;
          } catch (error) {
            throw Error('Invalid Base64 JSON String');
          }
        })
        .required()
    });
  }

  getCommandLogs() {
    return Joi.object().keys({
      sessionid: Joi.string().required(),
      fromDate: Joi.date().raw().required(),
      toDate: Joi.date().raw().required(),
      commandTypeIds: Joi.string()
        .custom((doc) =>
          doc.indexOf(',') >= 0
            ? doc.split(',').map((e) => (Number(e) ? Number(e) : 0))
            : [Number(doc) ? Number(doc) : 0]
        )
        .allow('', null)
        .default(null),
      usernames: Joi.string()
        .custom((doc) => (doc.indexOf(',') >= 0 ? doc.split(',') : [doc]))
        .allow('', null)
        .default(null),
      ruleIds: Joi.string()
        .custom((doc) => (doc.indexOf(',') >= 0 ? doc.split(',') : [doc]))
        .allow('', null)
        .default(null)
    });
  }
}

module.exports = new CommandsValidator();

/********************* Propiedad de Métrica Móvil SA de CV **************************/