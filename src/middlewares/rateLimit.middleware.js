const rateLimit = require("express-rate-limit");
const { server: { baseMaxRequest, baseIntervalMin, authMaxRequest, authIntervalMin } } = require('../config/env');

class RateLimitMiddleware {
  baseLimit = () =>
    rateLimit({
      windowMs: baseIntervalMin * 60 * 1000,
      max: baseMaxRequest,
      message: {
        status: false,
        message: `Request Limit Exceeded: Excessive requests from this IP address. (${baseMaxRequest}x${baseIntervalMin}min)`,
        data: null
      }
    });

  authLimit = () =>
    rateLimit({
      windowMs: authIntervalMin * 60 * 1000,
      max: authMaxRequest,
      message: {
        status: false,
        message: `Authentication Error: Excessive requests from this IP address. (${authMaxRequest}x${authIntervalMin}min)`,
        data: null
      }
    });
}

module.exports = new RateLimitMiddleware();