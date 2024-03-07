const routes = require('express').Router();
const baseRouter = require('express').Router();

const shorcutController = require('../controllers/shortcut.controller');
const shortcutMiddleware = require('../middlewares/shortcut.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

routes.post('/shortcut', tokenMiddleware.verify, shortcutMiddleware.addShorcut, shorcutController.addShorcut);
routes.put('/shortcut', tokenMiddleware.verify, shortcutMiddleware.updateShortcut, shorcutController.updateShorcut);
routes.delete('/shortcut', tokenMiddleware.verify, shortcutMiddleware.deleteShortcut, shorcutController.deleteShorcut);
routes.get('/shortcuts', tokenMiddleware.verify, shorcutController.getShortcuts);
routes.get('/shortcut-flags', shorcutController.getShortcutFlags);
routes.get('/shorcut', shorcutController.shorcutStructure);

baseRouter.use('/api', routes);

module.exports = baseRouter;