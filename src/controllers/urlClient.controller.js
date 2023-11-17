const DBService = require('../services/database');
const DbService = new DBService();

class UrlClientController {
    async evidenceService (req, res, next) {
        try {
            const data = await DbService.urlClient();

            res.status(200).json({
                status: true,
                message: '',
                data: data.evidenceUrl || 'https://mmcam-cds.metricamovil.com/dev/api/'
            })
        } catch (error) {
            await DbService.errorLogs('API', error, '/api/evidence-service');
            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }
}

module.exports = new UrlClientController();