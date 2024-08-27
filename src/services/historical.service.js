const { query } = require('./dbconnection');

class Historical {
    getHistoricalVideoDownloadConfig = async (token) => {
        try {
            const result = await query('SELECT * FROM select_historical_video_download_configuration_fn($1) as QUERY', [
                token
            ]);

            if (result[0] && result.length) return result[0];
        } catch (error) {
            throw error;
        }
    }

    getAlarmsForVideoTransmission = async (token, vehicleId, fromDate, toDate) => {
        try {
            const result = await query('SELECT * FROM get_alarms_for_video_transmission_fn($1,$2,$3,$4) as QUERY', [
                token,
                vehicleId,
                fromDate,
                toDate
            ]);

            if (result.length) return result;
            else return [];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Historical();