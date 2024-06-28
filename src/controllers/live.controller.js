const FTAPIService = require('../services/FT_API.service');

const DBService = require('../services/database');
const DbService = new DBService();

class LiveController {
	async getLiveLink(req, res, next) {
		const { channels, uniqueId, audio, quality, streamType, mediaType } = req.params.config;
		const { token } = req.headers;
		try {
			const data = await FTAPIService.getDeviceLiveViewUrl(token, channels, uniqueId, audio, quality, streamType, mediaType);
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/live/link/:config');
			next(error);
		}
	}

	async getLiveVideoConfig(req, res) {
		try {
			const { sessionid } = req.sessionid;

			const data = await DbService.getLiveVideoConfig(sessionid);

			res.status(200).json({
				status: true,
				message: '',
				data: data
			});
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/live/video/config');

			if (error.code == 42883) {
				res.status(200).json({
					status: true,
					message: '',
					data: {
						"alertTime": 5,
						"cutOffDateDay": 25,
						"planId": 1,
						"planName": 'Estandar',
						"timeLimitPerView": 10,
						"totalTimeLimit": 100
					}
				});
			} else {
				res.status(500).json({
					status: false,
					message: error.message || error,
					data: null
				});
			}
		}
	}
}

module.exports = new LiveController()

/********************* Propiedad de Métrica Móvil SA de CV **************************/