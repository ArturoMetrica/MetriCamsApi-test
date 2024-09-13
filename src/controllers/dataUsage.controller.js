const dataUsageService = require('../services/dataUsage.service');
const DBService = require('../services/database');
const dbService = new DBService();

class DataUsageController {
	async getDataUsage(req, res) {
		try {
			const { sessionid } = req.sessionid;
			const { offset } = req.data;

			const { data, message } = await dataUsageService.getDataUsage(sessionid, offset);

			if (!data.length) data = [];

            const newArray = data.map( e => {
                let liveVideo = (e.liveVideoDuration * 100) / e.liveViewTotalTimeLimit;
                let downloadVideos = (e.evidenceDownloadCount * 100) / e.maxAutomaticDownload;
                let snapsTaken = (e.snapCount * 100) / e.snapTotalLimit;

				let sum = (liveVideo + downloadVideos + snapsTaken) / 3;

				return {
					...e,
					dataUsagePercent: sum.toFixed(2)
				}
            });

			res.status(200).json({
				status: true,
				message,
				newArray
			});


		} catch (error) {
			await dbService.errorLogs('API', error, '/api/data/usage');

			res.status(500).json({
				status: false,
				message: error.message || error,
				data: null
			});
		}
	}

}

module.exports = new DataUsageController();