const { default: axios } = require("axios");
const DBService = require('../services/database');
const { checkValidTokenConnector } = new DBService();
const DbService = new DBService();

class tokenController {
    check = async (req, res) => {
        try {
            const { token } = req.sessionid;

            const data = await checkValidTokenConnector(token);

            res.status(200).json({
                code: data.code,
                status: data.status,
                message: data.message,
                data: data.data.token || null
            })
        } catch (error) {
            await DbService.errorLogs('API', error, '/check');

            res.status(500).json({
                code: 500,
                status: false,
                message: data.message || error,
                data: {}
            })
        }
    }
}

module.exports = new tokenController();