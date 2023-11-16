const router = require("express").Router();

const { baseLimit } = require('../middlewares/rateLimit.middleware');
const SecurityMiddleware = require('../middlewares/security.middleware');
const ErrorMiddlware = require('../middlewares/error.middleware');

router.use(
  baseLimit(),
  SecurityMiddleware.verifyApiKey,
  ErrorMiddlware.handleNotFound,
  ErrorMiddlware.handleError,
);

module.exports = router;