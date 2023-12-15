const DBService = require('../services/database');
const dbService = new DBService();

class ClassificationMessageController {
    async insertClassificationMessages (req, res) {
        try {
            const { message, groups } = req.classification;
            const { sessionid } = req.sessionid;

            const { data } = await dbService.insertClassificationMessage(sessionid, message, groups);
            res.status(200).json({
                status: true,
                message: '',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/classification-message/insert');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async updateClassificationMessages (req, res) {
        try {
            const { id, message, groups } = req.classification;
            const { sessionid } = req.sessionid;

            const { data } = await dbService.updateClassificationMessage(sessionid, id, message, groups);
            res.status(200).json({
                status: true,
                message: '',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/classification-message/update');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async deleteClassificationMessages (req, res) {
        try {
            const { classifications } = req.classification;
            const arrCsf = classifications.split(',');
            const { sessionid } = req.sessionid;

            const { data, message } = await dbService.deleteClassificationMessage(sessionid, arrCsf);
            res.status(200).json({
                status: true,
                message,
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/classification-message/delete');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async classificateAllPages (req, res) {
        try {
            const { sessionid} = req.sessionid;
            const { startTime, endTime, vehicles, rulesG, rulesS, dataC, offset } = req.classification;

            const { data, message } = await dbService.classificationForAllPages(sessionid, startTime, endTime, vehicles, rulesG, rulesS, dataC, offset);
            res.status(200).json({
                status: true,
                message,
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/classification/pages');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

}

module.exports = new ClassificationMessageController();