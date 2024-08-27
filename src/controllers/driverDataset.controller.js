const driverDatasetService = require('../services/driverDataset.service');
const DBService = require('../services/database');
const { errorLogs } = new DBService();

const getDriverDataset = async (req, res) => {
    try {
        const { sessionid } = req.query;
        const { data, message } = await driverDatasetService.getDriverDataset(sessionid);
		
        res.status(200).json({
            status: true,
            message,
            data });
    } catch (error) {
        await errorLogs('API', error, '/api/driver/dataset/get');

        res.status(500).json({
            status: false,
            message: error.message || error,
            data: null
        });
    }
}

const updateDriverDataset = async (req, res) => {
    try {
        const { datasetId, isActive } = req.driver;
        const { sessionid } = req.query;

		const { data } = await driverDatasetService.updateDriverDataset(sessionid, datasetId, isActive);
        
        return res.status(200).json({
            status: data,
            message: '',
            data: '[]'
          });
    } catch (error) {
        await errorLogs('API', error, '/api/driver/dataset/update');

        return res.status(500).json({
            status: false,
            message: error.message || error,
            data: null
        });
    }
}


module.exports = {
	getDriverDataset,
    updateDriverDataset,
}