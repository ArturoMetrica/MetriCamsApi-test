const Joi = require('joi');

class EvidenceValidator {
    uploadEvidence() {
        return Joi.object().keys({
            evidence: Joi.array().items(
                Joi.object().keys({
                    idGeotabAlarm: Joi.number().optional().default(null),
                    idAlarm: Joi.number().optional().default(null),
                    idVehicle: Joi.number().required(),
                    serialMdvr: Joi.string().required(),
                    chnl: Joi.number().required(),
                    downloadId: Joi.string().required(),
                })).required()
        }).options({ allowUnknown: true, stripUnknown: true })
    }

    deleteEvidence() {
        return Joi.object().keys({
            idAlarm: Joi.number().required(),
            source: Joi.string().required(),
            state: Joi.number().required(),
            subState: Joi.number().required()
        }).options({ allowUnknown: true, stripUnknown: true })
    }

    getEvidenceLink() {
        return Joi.object().keys({
            streamaxIds: Joi.array().required(),
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    evidenceCount() {
        return Joi.object().keys({
            vehicles: Joi.array().required(),
        }).options({ allowUnknown: true, stripUnknown: true });
    }
}

module.exports = new EvidenceValidator();