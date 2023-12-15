const router = require('express').Router();

const Controller = require('../controllers/classificationMessage.controller');
const Middleware = require('../middlewares/classificationMessage.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');

router.post('/api/classification-message', TokenMiddleware.verify, Middleware.insertClassificationMessage, Controller.insertClassificationMessages);
router.put('/api/classification-message', TokenMiddleware.verify, Middleware.updateClassificationMessage, Controller.updateClassificationMessages);
router.delete('/api/classification-message', TokenMiddleware.verify, Middleware.deleteClassificationMessage, Controller.deleteClassificationMessages);
router.post('/api/classification/pages', TokenMiddleware.verify, Middleware.classificateAllPages, Controller.classificateAllPages);


module.exports = router;