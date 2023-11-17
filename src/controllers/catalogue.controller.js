const DBService = require('../services/database');
const DbService = new DBService();

let isInserting = false;

class CatalogueController {
    async updateVisibilityForDinamicExceptions(req, res) {
        if (isInserting) {
            return res.status(429).json({ message: 'Insertion in progress, try again later' });
        }

        isInserting = true;

        try {
            const { sessionid } = req.sessionid;
            const { params } = req.cat;
            const { data, message } = await DbService.updateVisibilityForDinamicExceptions(sessionid, params);

            await new Promise(resolve => setTimeout(resolve, 3000));

            res.status(200).json({
                status: true,
                message,
                data
            });

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        } finally {
            isInserting = false;
        }
    }

    getCatalogue = async (req, res) => {
        try {
            const { data, message } = await DbService.getCatalogue(req.sessionid.sessionid)

            res.status(200).json({
                status: true,
                message: `Successfully obteined`,
                data
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

}

module.exports = new CatalogueController();