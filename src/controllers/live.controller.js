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
}

module.exports = new LiveController()

/********************* Propiedad de Métrica Móvil SA de CV **************************/