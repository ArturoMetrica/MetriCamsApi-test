const streamaxService = require('../services/streamax.service');
const DBService = require('../services/database');
const { errorLogs } = new DBService();

class StreamaxController {
    addRule = async (req, res) => {
        try {
            const data = await streamaxService.addRule(req.sessionid.sessionid, req.rule);

            res.status(200).json({
                status: true,
                message: '',
                data: data[0].data
            });
        } catch (error) {
            await errorLogs('API', error, '/api/streamax/rule');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    updateRule = async (req, res) => {
        try {
            const data = await streamaxService.updateStreamaxRule(req.sessionid.sessionid, req.rule);

            res.status(data[0].query.code || 200).json(data[0].query);
        } catch (error) {
            await errorLogs('API', error, '/api/streamax/rule');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    deleteRule = async (req, res) => {
        try {
            const data = await streamaxService.deleteStreamaxRules(req.sessionid.sessionid, req.rule);

            res.status(data[0].query.code || 200).json(data[0].query);
        } catch (error) {
            await errorLogs('API', error, '/api/streamax/rule');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }
}

module.exports = new StreamaxController();