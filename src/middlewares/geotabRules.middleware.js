const GeotabRuleValidator = require("../validators/geotabRule.validator");
const DBService = require("../services/database");
const { checkValidToken } = new DBService();

class GeotabRuleMiddleware {
    async sessionId(req, res, next) {
        try {
            req.sessionid = await GeotabRuleValidator.sessionId().validateAsync({
                ...req.headers,
            });
            await checkValidToken(req.headers);
            next();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }
    async create(req, res, next) {
        try {
            req.geotabRule = await GeotabRuleValidator.insertGeotabRule().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body,
            })
            next()
        } catch (error) {
            console.log(error);
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async update(req, res, next) {
        try {
            req.geotabRule = await GeotabRuleValidator.update().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body,
            })
            next()
        } catch (error) {
            console.log("error", error);
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async delete(req, res, next) {
        try {
            req.geotabRule = await GeotabRuleValidator.delete().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.params,
            })
            next()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async getVehicles(req, res, next) {
        try {
            req.geotabRule = await GeotabRuleValidator.getVehicles().validateAsync({
                ...req.query,
                ...req.body
            })
            next()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async createAlarm(req, res, next) {
        try {
            req.geotabAlarm = await GeotabRuleValidator.insertAlarm().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body
            })
            next()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async geotabAlarmAttended(req, res, next) {
        try {
            req.geotabAlarm = await GeotabRuleValidator.setGeotabAlarmAttended().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body
            })
            next()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async classificationAlarm(req, res, next) {
        try {
            req.geotabAlarm = await GeotabRuleValidator.classificationAlarm().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body
            })
            next()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async verifiedGeotabAlarm(req, res, next) {
        try {
            req.geotabAlarm = await GeotabRuleValidator.verifiedGeotabAlarm().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body
            })
            next()
        } catch (error) {
            console.log(error);
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async updateClassification(req, res, next) {
        try {
            req.geotabAlarm = await GeotabRuleValidator.updateClassification().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body
            })
            next()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async getLocationLinks(req, res, next) {
        try {
            req.alarms = await GeotabRuleValidator.getLocationLinks().validateAsync({
                ...req.body,
                ...req.headers,
            })
            next()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async getAlarmGeotabStreamax (req, res, next) {
        try {
            req.alarms = await GeotabRuleValidator.getAlarmGeotabStreamax().validateAsync({
                ...req.body,
                ...req.headers,
            })
            next()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async classificationGeotabByUser (req, res, next) {
        try {
            req.geotab = await GeotabRuleValidator.classificationGeotabByUser().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body,
            })
            next ()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

    async classificationStreamaxByUser (req, res, next) {
        try {
            req.streamax = await GeotabRuleValidator.classificationStreamaxByUser().validateAsync({
                ...req.query,
                ...req.headers,
                ...req.body,
            })
            next ()
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error });
        }
    }

}

module.exports = new GeotabRuleMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/