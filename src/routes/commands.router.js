const router = require('express').Router();

const CommandsMiddleware = require('../middlewares/commands.middleware');
const CommandsController = require('../controllers/commands.controller');

router.get('/api/commands/types', CommandsMiddleware.getCommandTypes, CommandsController.getCommandTypes);
router.get('/api/commands', CommandsMiddleware.getCommandLogs, CommandsController.getCommandLogs);
router.post('/api/command/send', CommandsMiddleware.sendCommand, CommandsController.sendCommand);

module.exports = router;

/********************* Propiedad de Métrica Móvil SA de CV **************************/