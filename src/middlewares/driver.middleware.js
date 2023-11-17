const DriverValidator = require('../validators/driver.validator')
const DBService = require('../services/database')
const dbService = new DBService()

function generateLetterNumbers(number) {
	const u = number % 26
	const d = Math.floor(number / 26) % 26
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	return letters.charAt(d) + letters.charAt(u)
}

function rewriteFaceId({ employeeNumber, faces }) {
	return faces.map((face, idx) => ({
		...face,
		faceId: employeeNumber + generateLetterNumbers(idx),
	}))
}

class DriverMiddleware {
	async get(req, res, next) {
		try {
			req.driver = await DriverValidator.get().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async geotabGet(req, res, next) {
		try {
			req.driver = await DriverValidator.geotabGet().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			await dbService.checkValidToken(req.driver)
			next()
		} catch (error) {
			next(error)
		}
	}

	async create(req, res, next) {
		try {
			req.driver = await DriverValidator.create().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			req.driver.faces = rewriteFaceId(req.driver)
			next()
		} catch (error) {
			next(error)
		}
	}

	async update(req, res, next) {
		try {
			req.driver = await DriverValidator.update().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			req.driver.faces = rewriteFaceId(req.driver)
			next()
		} catch (error) {
			next(error)
		}
	}

	async delete(req, res, next) {
		try {
			req.driver = await DriverValidator.delete().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async updateCeibaFace(req, res, next) {
		try {
			req.driver = await DriverValidator.updateCeibaFace().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			await dbService.checkValidToken(req.driver)
			next()
		} catch (error) {
			next(error)
		}
	}

	async getFaces(req, res, next) {
		try {
			req.driver = await DriverValidator.getFaces().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			await dbService.checkValidToken(req.driver)
			next()
		} catch (error) {
			next(error)
		}
	}

	async deleteCeibaFace(req, res, next) {
		try {
			req.driver = await DriverValidator.deleteCeibaFace().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			await dbService.checkValidToken(req.driver)
			next()
		} catch (error) {
			next(error)
		}
	}

	async getFTAPIFaces(req, res, next) {
		try {
			req.driver = await DriverValidator.getFTAPIUFaces().validateAsync({
				...req.headers,
				...req.query,
			});
			await dbService.checkValidToken(req.headers);
			next();
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new DriverMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/