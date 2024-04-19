const DBService = require('../services/database');
const dbService = new DBService();

class LogController {
    async saveNavigationLog(req, res) {
        try {
            const { username, module, notes } = req.log;
            const data = await dbService.navigationLogs(username, module, notes);

            res.status(200).json({data});

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async errorLog(req, res) {
        try {
            const { identifier, error, module } = req.log;
            const data = await dbService.errorLogs(identifier, error, module);

            res.status(200).json({data});
            
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async exceptionsLog(req, res) {
        try {
            const { sessionid } = req.sessionid;
            const data = await dbService.exceptionsLogs(req.log, sessionid);

            res.status(200).json({data});
            
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async getExceptionsLog(req, res) {
        try {
            const { sessionid } = req.sessionid;
            const data = await dbService.getExceptionsLogs(req.log, sessionid);

            res.status(200).json({data});
            
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }
}

module.exports = new LogController()