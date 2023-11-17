const router = require('express').Router();
const Middleware = require('../middlewares/catalogue.middleware');
const Controller = require('../controllers/catalogue.controller');

router.put('/api/catalogue', Middleware.updateVisibilityForDinamicExceptions, Controller.updateVisibilityForDinamicExceptions);
router.get('/api/catalogue', Controller.getCatalogue);

module.exports = router;