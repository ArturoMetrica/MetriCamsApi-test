const { query } = require('./dbconnection');

    const getDriverDataset = async (sessionid) => {
        try {
            const result = await query('SELECT * FROM get_driver_dataset_fn($1) as DATA', [
				sessionid
			]);

            if (result[0] && result[0].data) return result[0].data;
        } catch (error) {
            throw { message: error, area: 'DB' };
        }
    };

    const updateDriverDataset = async (sessionid, datasetId, isActive) => {
        try {
            const result = await query('SELECT * FROM update_driver_dataset_fn($1,$2,$3) as DATA', [
				sessionid,
				datasetId,
				isActive
			]);

            if (result[0] && result[0].data) return result[0];
        } catch (error) {
            throw error;
        }
    }
    
    module.exports = {
        getDriverDataset,
        updateDriverDataset
    };