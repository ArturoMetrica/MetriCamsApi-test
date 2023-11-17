const validator = require('../validators/evidence.validator');

class EvidenceMiddleware {
    async getEvidenceLink (req, res, next) {
        try {
            req.streamax = await validator.getEvidenceLink().validateAsync({
                ...req.body
            });

            next ();
        } catch (error) {
            res.status(400).json({ status: false, message: error.message || error, data: null });
        }
    }
    
    async uploadEvidence(req, res, next) {
		try {
			req.preview = await validator.uploadEvidence().validateAsync({
				...req.body,
			});

			next();
		} catch (error) {
			res.json({ ok: false, message: error.message || error });
		}
	}

    async deleteEvidence(req, res, next) {
        try {
            req.evidence = await validator.deleteEvidence().validateAsync({
                ...req.headers,
                ...req.params,
                ...req.query
            });
            
            next();
        } catch (error) {
            res.json({ ok: false, message: error.message || error });
        }
    }

    async evidenceCount(req, res, next) {
        try {
            req.vehicles = await validator.evidenceCount().validateAsync({
                ...req.query,
                ...req.params,
                ...req.body
            });

            next();
        } catch (error) {
            res.json({ ok: false, message: error.message || error })
        }
    }
}

module.exports = new EvidenceMiddleware();