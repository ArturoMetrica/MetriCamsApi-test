const FTAPIService = require('../services/FT_API.service');
const DBService = require('../services/database');
const dbService = new DBService();

const { tz } = require('../config/env');


class EvidenceController {
    async uploadEvidence(req, res) {
        try {
            const { evidence } = req.preview
            const data = await dbService.uploadEvidence(evidence);
            res.status(200).json({
                status: true,
                message: '',
                data: evidence
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/upload-evidence');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async deleteEvidence(req, res) {
        try {
            const { idAlarm, source, state, substate } = req.evidence;
            const { token, taskIds, deleteFiles } = req.task;

            const { success, message, code } = await FTAPIService.deleteFileDownloadLink(token, taskIds, deleteFiles);

            if (!success) {
                return res.status(500).json({
                    status: false,
                    message,
                    data: null
                })
            }

            const data = await dbService.deleteTaskId(idAlarm, taskIds, source, state, substate);

            res.status(200).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/video/download/task');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async getEvidenceLink(req, res, next) {
        try {
            const { streamaxIds } = req.streamax;
            const data = await dbService.getEvidenceLink(streamaxIds);

            res.status(200).json({
                status: true,
                message: '',
                data: data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/evidence');

            res.json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async evidenceCount(req, res, next) {
        try {
            const { vehicles } = req.vehicles;
            const offset = tz.locale;
            const { data } = await dbService.evidenceCount(vehicles, offset);

            res.status(200).json({
                status: true,
                message: '',
                data: data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/evidence-count');

            res.json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }
}

module.exports = new EvidenceController();