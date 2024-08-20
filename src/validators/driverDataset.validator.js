const Joi = require('joi');

class DriverDatasetValidator {
    updateDriverDataset = () => {
        return Joi.object().keys({
            datasetId: Joi.number().required(),
            isActive: Joi.boolean().required(),
        })
        .options({ allowUnknown: true, stripUnknown: true })
    };
}

module.exports = new DriverDatasetValidator();