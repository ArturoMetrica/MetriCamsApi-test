const Joi = require('joi');

class DeviceValidator {
    addDevice = () => {
        return Joi.object().keys({

        }).options({ allowUnknown: true, stripUnknown: true });
    }

    updateDevice = () => {
        return Joi.object().keys({

        }).options({ allowUnknown: true, stripUnknown: true });
    }

    deleteDevice = () => {
        return Joi.object().keys({
            
        }).options({ allowUnknown: true, stripUnknown: true });
    }

}

module.exports = new DeviceValidator();