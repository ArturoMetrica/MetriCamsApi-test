const PreviewValidator = require('../validators/preview.validator')

class PreviewMiddleware {
	async get(req, res, next) {
		try {
			req.preview = await PreviewValidator.get().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async getFT(req, res, next) {
		try {
			req.preview = await PreviewValidator.getFT().validateAsync({
				...req.query,
				...req.params,
				...req.body,
				...req.headers
			})

			next()
		} catch (error) {
			next(error)
		}
	}

	async video(req, res, next) {
		try {
			req.preview = await PreviewValidator.video().validateAsync({
				...req.query,
				...req.params,
				...req.body,
			})
			next()
		} catch (error) {
			next(error)
		}
	}

	async uploadGeotabEvidence(req, res, next) {
		try {
			req.preview = await PreviewValidator.uploadGeotabEvidence().validateAsync({
				...req.body,
			});

			next();
		} catch (error) {
			res.json({ ok: false, message: error.message || error });
		}
	}

	async uploadStreamaxEvidence(req, res, next) {
		try {
			req.preview = await PreviewValidator.uploadStreamaxEvidence().validateAsync({
				...req.body,
			});

			next();
		} catch (error) {
			res.json({ ok: false, message: error.message || error });
		}
	}

	async uploadEvidence(req, res, next) {
		try {
			req.preview = await PreviewValidator.uploadEvidence().validateAsync({
				...req.body,
			});

			next();
		} catch (error) {
			res.json({ ok: false, message: error.message || error });
		}
	}

}

module.exports = new PreviewMiddleware()

/********************* Propiedad de Métrica Móvil SA de CV **************************/