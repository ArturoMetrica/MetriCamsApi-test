const GeotabService = require('../services/geotab.service');

const DBService = require('../services/database');
const DbService = new DBService();

class ZoneController {
    async getZones(req, res) {
        try {
            const geotabService = new GeotabService();
            const zones = await geotabService.getTypeZones();

            res.status(200).json({
                status: true,
                message: '',
                data: zones
            });
        } catch (error) {
            await DbService.errorLogs('API', error, '/api/zones');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }
}

module.exports = new ZoneController();