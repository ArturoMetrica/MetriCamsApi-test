const DBService = require('../services/database');
const promiseHandlerService = require('../services/promiseHandler.service');
const dbService = new DBService();

class GeotabController {
    async create(req, res, next) {
        try {
            const { idGeotabRule, name, description, secsPreEvent, secsPosEvent, creationDate, isPublic, isPopup,
                isEmail, emailList, isActive, gifRequired, videoRequired, idFleet, idVehicle, idAlarmCategory, cams, zoneRestrictionIdEntry, zoneRestrictionNameEntry, zoneRestrictionIdExit, zoneRestrictionNameExit, zoneRestriction, zoneGeofence, zoneRuleIdEntry, zoneRuleNameEntry, zoneRuleIdExit, zoneRuleNameExit, cameraType, cameraTypeId } = req.geotabRule;
            const { sessionid } = req.sessionid;
            const data = await dbService.insertGeotabRule({
                idGeotabRule,
                name,
                description,
                secsPreEvent,
                secsPosEvent,
                creationDate,
                isPublic,
                isPopup,
                isEmail,
                emailList,
                isActive,
                gifRequired,
                videoRequired,
                sessionid,
                idFleet: idFleet.length > 0 ? idFleet : null,
                idVehicle: idVehicle.length > 0 ? idVehicle : null,
                idAlarmCategory,
                cams: cams.length > 0 ? cams : null,
                zoneRestrictionIdEntry,
                zoneRestrictionNameEntry,
                zoneRestrictionIdExit,
                zoneRestrictionNameExit,
                zoneRestriction,
                zoneGeofence,
                zoneRuleIdEntry,
                zoneRuleNameEntry,
                zoneRuleIdExit,
                zoneRuleNameExit,
                cameraType,
                cameraTypeId
            });
            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/geotab-rule');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async update(req, res) {
        try {
            const { idGeotabRuleSerial, name, idFleet, idVehicle, description, secsPreEvent, secsPosEvent,
                isPublic, isPopup, isActive, gifRequired, videoRequired, isEmail, emailList, idAlarmCategory, cams, zoneRestrictionIdEntry, zoneRestrictionNameEntry, zoneRestrictionIdExit, zoneRestrictionNameExit, zoneRestriction, zoneGeofence, zoneRuleIdEntry, zoneRuleNameEntry, zoneRuleIdExit, zoneRuleNameExit, cameraType, cameraTypeId } = req.geotabRule;
            const { sessionid } = req.sessionid;
            const data = await dbService.updateGeotabRule({
                idGeotabRuleSerial,
                name,
                sessionid,
                idFleet: idFleet.length > 0 ? idFleet : null,
                idVehicle: idVehicle.length > 0 ? idVehicle : null,
                description,
                secsPreEvent,
                secsPosEvent,
                isPublic,
                isPopup,
                isActive,
                gifRequired,
                videoRequired,
                isEmail,
                emailList,
                idAlarmCategory,
                cams: cams.length > 0 ? cams : null,
                zoneRestrictionIdEntry,
                zoneRestrictionNameEntry,
                zoneRestrictionIdExit,
                zoneRestrictionNameExit,
                zoneRestriction,
                zoneGeofence,
                zoneRuleIdEntry,
                zoneRuleNameEntry,
                zoneRuleIdExit,
                zoneRuleNameExit,
                cameraType,
                cameraTypeId
            });
            console.log({
                idGeotabRuleSerial, name, idFleet, idVehicle, description, secsPreEvent, secsPosEvent,
                isPublic, isPopup, isActive, gifRequired, videoRequired, isEmail, emailList, idAlarmCategory, cams, zoneRestrictionIdEntry, zoneRestrictionNameEntry, zoneRestrictionIdExit, zoneRestrictionNameExit, cameraType, cameraTypeId
            });
            res.status(data ? 200 : 400).json({
                status: true,
                message: '',
                data: req.geotabRule,
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/geotab-rule');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async delete(req, res) {
        try {
            const { idGeotabRuleSerial } = req.geotabRule;
            const { sessionid } = req.sessionid;
            const data = await dbService.deleteGeotabRule(idGeotabRuleSerial, sessionid);
            res.status(data ? 200 : 400).json({
                status: true,
                message: 'myGeotab rule removed successfully',
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/geotab-rule');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async get(req, res) {
        try {
            const data = await dbService.getGeotabRule(req.sessionid.sessionid);

            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/geotab-rule');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async getVehiclesByGeoRule(req, res) {
        try {
            const data = await dbService.getVehiclesByGeotabRule(req.idGeotabRule);

            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/geotab-vehicles');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async createAlarm(req, res) {
        try {
            const { geotabGORule, geotabGOId, idDriver, idAlarm, duration, altitude, direction,
                gpsTime, gpsLat, gpsLng, speed, recordSpeed, state, creationDate, type, content, cmdType } = req.geotabAlarm;
            const data = await dbService.insertGeotabAlarm({
                geotabGORule,
                geotabGOId,
                idDriver,
                idAlarm,
                duration,
                altitude,
                direction,
                gpsTime,
                gpsLat,
                gpsLng,
                speed,
                recordSpeed,
                state,
                creationDate,
                type,
                content,
                cmdType
            });
            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/geotab-alarm');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async geotabAlarmAttended(req, res) {
        try {
            const { idsGeotabAlarm } = req.geotabAlarm;
            const { sessionid } = req.sessionid;
            const data = await dbService.setGeotabAlarmAttended(
                sessionid,
                idsGeotabAlarm
            );
            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/geotab-attended');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async classificationAlarm(req, res) {
        try {
            const { idGeotabAlarm, idClassificationMessage, comment } = req.geotabAlarm;
            const { sessionid } = req.sessionid;
            const data = await dbService.classificationAlarm(
                idGeotabAlarm,
                idClassificationMessage,
                sessionid,
                comment
            );
            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/geotab-classification-alarm');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async getClassification(req, res) {
        try {
            const data = await dbService.getClassification(req.sessionid.sessionid);

            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/classification');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async getCategory(req, res) {
        try {
            const data = await dbService.getCategory(req.sessionid.sessionid);

            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/category');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    async verifiedGeotabAlarm(req, res) {
        try {
            const { idGeotabAlarm, boolvalue } = req.geotabAlarm;
            const { sessionid } = req.sessionid;
            const data = await dbService.verifiedGeotabAlarm(
                sessionid,
                idGeotabAlarm,
                boolvalue
            );
            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/verified-alarm');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async updateClassification(req, res) {
        try {
            const { idClassification, idClassificationMessage, comment } = req.geotabAlarm;
            const { sessionid } = req.sessionid;
            const data = await dbService.updateClassification(
                idClassification,
                idClassificationMessage,
                sessionid,
                comment
            );
            res.status(data.code || 400).json(data);
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/classification');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async getLocationLinks(req, res) {
        try {
            const data = await dbService.getLocationLinks(req.alarms);
            res.status(200).json({
                status: true,
                message: '',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/location-evidences');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async getAlarmGeotabStreamax(req, res) {
        try {
            const { rulesS, vehicles, startTime, endTime, statusP, statusE, rulesG, offSet } = req.alarms;
            const { sessionid } = req.sessionid;
            const data = await dbService.getAlarmGeotabStreamax(
                sessionid,
                rulesS.length > 0 ? rulesS : null,
                vehicles.length > 0 ? vehicles : null,
                startTime,
                endTime,
                statusP,
                statusE,
                rulesG.length > 0 ? rulesG : null,
                offSet
            );
            res.status(200).json({
                status: true,
                message: '',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/alarms');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async classificationGeotabByUser(req, res) {
        try {
            const { sessionid } = req.sessionid;

            const { data } = await dbService.classificationGeotabByUser(sessionid, req.geotabAlarm.alarmArr);

            res.status(200).json({
                status: true,
                message: '',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/geotab-calification');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }

    async classificationStreamaxByUser(req, res) {
        try {
            const { sessionid } = req.sessionid;

            const { data } = await dbService.classificationStreamaxByUser(sessionid, req.streamax.alarmArr);

            res.status(200).json({
                status: true,
                message: '',
                data
            });
        } catch (error) {
            await dbService.errorLogs('API', error, '/api/streamax-calification');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            })
        }
    }
}

module.exports = new GeotabController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/