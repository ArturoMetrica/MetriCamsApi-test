const DBService = require('../services/database');
const DbService = new DBService();
const moment = require('moment');

class AlarmTaskController {
    async getTaskId(req, res) {
        try {

            const { message, data } = await DbService.getTaskId(req.alarm.idAlarm, req.alarm.source);
            res.status(200).json({ status: true, message, data });

        } catch (error) {
            await DbService.errorLogs('API', error, '/api/alarm/taskid');
            res.status(500).json({ status: false, message: error.message || error, data: null });
        }
    }

    async getAlarmsByUserPagination(req, res) {
        try {
            let { startTime, endTime, vehicles, rulesG, rulesS, severity, evidence, classification, offSet, rowNumber, limit, isAttended } = req.alarms;
            const { sessionid } = req.sessionid;

            const dateLimit = moment(startTime).add(30, 'days').format('YYYY-MM-DD HH:mm:ss');

            if (endTime > dateLimit) {
                throw 'You can not query more than 30 days.';
            }

            const data = await DbService.getAlarmsByUserPagination(
                sessionid,
                startTime,
                endTime,
                vehicles.length > 0 ? vehicles : [],
                rulesG.length > 0 ? rulesG : [],
                rulesS.length > 0 ? rulesS : [],
                severity.length > 0 ? severity : undefined,
                evidence,
                classification ? classification : null,
                offSet,
                rowNumber,
                limit,
                isAttended
            );
            res.status(200).json({
                status: true,
                message: '',
                count: data.data.length,
                ...data
            });
        } catch (error) {
            await DbService.errorLogs('API', error, '/api/alarms/page');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }
}

module.exports = new AlarmTaskController();