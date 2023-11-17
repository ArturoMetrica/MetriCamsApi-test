const surfsightService = require('../services/surfsight.service');
const DBService = require('../services/database');
const surfsightHelper = require('../helpers/surfsight.helper');
const dbService = new DBService();

class SurfsightController {
    async login(req, res) {
        try {
            const token = await surfsightService.login();

            res.status(200).json({
                ok: true,
                token
            })
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/login/surfsight');

            res.status(400).json({
                ok: false,
                message: error.message
            });
        }
    }

    async addMultipleDevices(req, res) {
        try {
            const { orgId, devicesArray } = req.devices;
            const { data, message } = await surfsightService.addMultipleDevices(req.token.token, orgId, devicesArray);

            res.status(200).json({
                status: true,
                message: message !== 'Success' ? message : undefined,
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/devices');

            res.status(400).json({
                ok: false,
                message: error.message
            });
        }
    }

    async addDevice(req, res) {
        try {
            const { orgId, name, imei, grupoId } = req.device;
            const { data, message } = await surfsightService.addDevice(req.token.token, orgId, name, imei, grupoId);

            res.status(200).json({
                status: true,
                message: message !== 'Success' ? message : undefined,
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/device');

            res.status(400).json({
                ok: false,
                message: error.message
            });
        }
    }

    async getActiveCameras(req, res) {
        try {
            const { imei } = req.cameras;
            const data = await surfsightService.getActiveCameras(req.token.token, imei);

            if (data.response.data.message) throw new Error(data.response.data.message);

            res.status(200).json({
                status: true,
                message: message !== 'Success' ? message : undefined,
                data: data.data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/cameras');

            res.status(400).json({
                ok: false,
                message: error.message
            });
        }
    }

    async deviceDataUsage(req, res) {
        try {
            const { imei } = req.usage;
            const { data } = await surfsightService.deviceDataUsage(req.token.token, imei);

            res.status(200).json({
                status: true,
                message: 'Success',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/data-usage');

            res.status(400).json({
                status: false,
                message: error.message,
                data: ''
            })
        }
    }

    async devicesDataUsage(req, res) {
        try {
            const { imeis } = req.usage;
            const { dataUsage } = await surfsightService.devicesDataUsage(req.token.token, imeis);

            res.status(200).json({
                status: true,
                message: 'Success',
                data: dataUsage
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/devices/data-usage');

            res.status(400).json({
                status: false,
                message: error.message,
                data: ''
            })
        }
    }

    async cameraSnapshot(req, res) {
        try {
            const { imei, cameraId, time } = req.snap;
            const { data, message } = await surfsightService.cameraSnapshot(req.token.token, imei, cameraId, time);

            res.status(200).json({
                status: true,
                message: message !== 'Success' ? message : undefined,
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/snapshot');

            res.status(400).json({
                ok: false,
                message: error.message,
                data: ''
            });
        }
    }

    async selectRecording(req, res) {
        try {
            const { imei, start, end } = req.record;
            const { data } = await surfsightService.selectRecording(req.token.token, imei, start, end);

            res.status(200).json({
                status: true,
                message: 'Success',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/record');

            res.status(400).json({
                ok: false,
                message: error.message,
                data: ''
            });
        }
    }

    async getListOfAvaiableEventsMediaFiles(req, res) {
        try {
            const { imei, start, end } = req.files;
            const { data } = await surfsightService.getListOfAvaiableEventsMediaFiles(req.token.token, imei, start, end);

            res.status(200).json({
                status: true,
                message: 'Success',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/event/record');

            res.status(400).json({
                ok: false,
                message: error.message,
                data: ''
            });
        }
    }

    async downloadEvent(req, res) {
        try {
            const { imei, fileId, cameraId, fileType } = req.event;
            const { data } = await surfsightService.downloadEvent(req.token.token, imei, fileId, cameraId, fileType);

            res.status(200).json({
                status: true,
                message: 'Success',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/download/event');

            res.status(400).json({
                ok: false,
                message: error.message,
                data: ''
            });
        }
    }

    streaming = async (req, res) => {
        try {
            const { imei, channel } = req.streaming

            const data = await surfsightHelper.streaming(req.token.token, imei, channel);

            res.status(200).json({
                status: true,
                message: 'Source obtained successfully',
                data
            });
        } catch (error) {
            res.status(error.response.status || 500).json({
                status: false,
                message: error.response.data.message || error.message || error,
                data: null
            });
        }
    }

    async createVirtualEvent(req, res) {
        try {
            const { imei, time, mediaType, durationSeconds, quality, cameraId, metadata } = req.event;
            const { data } = await surfsightService.createVirtualEvent(req.token.token, imei, time, mediaType, durationSeconds, quality, cameraId, metadata);

            res.status(200).json({
                status: true,
                message: 'Success',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/virtual/event');

            res.status(400).json({
                ok: false,
                message: error.message,
                data: ''
            });
        }
    }

    async getEventDetails(req, res) {
        try {
            const { imei, start, end } = req.event;
            const { data } = await surfsightService.getEventDetails(req.token, imei, start, end);

            res.status(400).json({
                status: true,
                message: 'Success',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/surfsight/virtual/event/details');

            res.status(400).json({
                ok: false,
                message: error.message,
                data: ''
            });
        }
    }
    calendar = async (req, res) => {
        try {

            const data = await surfsightService.recordingsAvailability({ ...req.token, ...req.calendar });

            res.status(200).json({
                status: true,
                message: '',
                data
            });
        } catch (error) {
            res.status(error.response.status || 500).json({
                status: false,
                message: error.response.data.message || error.message || error,
                data: null
            });
        }
    }

    recording = async (req, res) => {
        try {
            const data = await surfsightHelper.recording({ ...req.token, ...req.recording });

            res.status(200).json({
                status: true,
                message: '',
                data
            });
        } catch (error) {
            res.status(error.response.status || 500).json({
                status: false,
                message: error.response.data.message || error.message || error,
                data: null
            });
        }
    }

}

module.exports = new SurfsightController();