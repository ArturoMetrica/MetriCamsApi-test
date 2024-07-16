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
}

module.exports = new Historical();