const CodeGroupService = require('../services/codeGroup.service.js')

const DBService = require('../services/database');
const DbService = new DBService();

class CodeGroupController {
	async get(req, res, next) {
		try {
			const data = await CodeGroupService.get(req.codeGroup)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/groups/code');
			next(error)
		}
	}

	async update(req, res, next) {
		try {
			const data = await CodeGroupService.update(req.codeGroup)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/groups/:id/code');
			next(error)
		}
	}

	async delete(req, res, next) {
		try {
			const data = await CodeGroupService.delete(req.codeGroup)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await DbService.errorLogs('API', error, '/api/groups/:id/code');
			next(error)
		}
	}
}

module.exports = new CodeGroupController()

/********************* Propiedad de Métrica Móvil SA de CV **************************/