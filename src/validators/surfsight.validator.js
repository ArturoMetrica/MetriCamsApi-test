const Joi = require('joi');

class SurfsightValidator {
    token() {
        return Joi.object().keys({
            token: Joi.string().required(),
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    addMultipleDevices() {
        return Joi.object().keys({
            orgId: Joi.number().required(),
            devicesArray: Joi.array().items(
                Joi.object().keys({
                    imei: Joi.string().required(),
                    name: Joi.string().required(),
                    groupId: Joi.number().optional()
                })
            ).required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    addDevice() {
        return Joi.object().keys({
            orgId: Joi.number().required(),
            name: Joi.string().required(),
            imei: Joi.string().required(),
            groupId: Joi.number().optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    getActiveCameras() {
        return Joi.object().keys({
            imei: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    deviceDataUsage() {
        return Joi.object().keys({
            imei: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    devicesDataUsage() {
        return Joi.object().keys({
            imeis: Joi.array().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    cameraSnapshot() {
        return Joi.object().keys({
            imei: Joi.string().required(),
            cameraId: Joi.string().required(),
            time: Joi.string().optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    selectRecording() {
        return Joi.object().keys({
            imei: Joi.string().required(),
            start: Joi.string().required(),
            end: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    getListOfAvaiableEventsMediaFiles() {
        return Joi.object().keys({
            imei: Joi.string().required(),
            start: Joi.string().required(),
            end: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    downloadEvent() {
        return Joi.object().keys({
            imei: Joi.string().required(),
            fileId: Joi.string().required(),
            cameraId: Joi.string().required(),
            fileType: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    streaming() {
        return Joi.object().keys({
            imei: Joi.string().required(),
            channel: Joi.number().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    createVirtualEvent() {
        return Joi.object().keys({
            imei: Joi.string().required(),
            time: Joi.string().required(),
            mediaType: Joi.string().optional(),
            durationSeconds: Joi.number().optional(),
            quality: Joi.string().optional(),
            cameraId: Joi.number().optional(),
            metadata: Joi.string().optional()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    getEventDetails() {
        return Joi.object().keys({
            imei: Joi.string().required(),
            start: Joi.string().required(),
            end: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    calendar = () => {
        return Joi.object().keys({
            imei: Joi.string().required(),
            start: Joi.string().required(),
            end: Joi.string().required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

    recording = () => {
        return Joi.object().keys({
            imei: Joi.string().required(),
            cameraType: Joi.number().required(),
            start: Joi.string().required(),
            videoDuration: Joi.number().min(0).max(60).required(),
            qualityLevel: Joi.string().valid('lq', 'hq').required()
        }).options({ allowUnknown: true, stripUnknown: true });
    }

}

module.exports = new SurfsightValidator();