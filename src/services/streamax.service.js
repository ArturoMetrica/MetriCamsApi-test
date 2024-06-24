const { query } = require('./dbconnection');

class StreamaxService {
    addRule = async (sessionId, { idVehicle, idFleet, idAlarm, ruleName, desc, isPublic, isPopup, isEmail, secPre, secsPos, isActive, emailList, creationDate, gifRequired, videoRequired, alarmCategoryId, zoneRestrictionIdEntry, zoneRestrictionNameEntry, zoneRestrictionIdExit, zoneRestrictionNameExit, isZoneRestriction, zoneGeofence, zoneRuleIdEntry, zoneRuleNameEntry, zoneRuleIdExit, zoneRuleNameExit, cameraType, cameraTypeId}) => {
        try {
            return await query('SELECT * FROM insert_streamax_rules_fn($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) AS DATA', [
                sessionId,
                idVehicle,
                idFleet,
                idAlarm,
                ruleName,
                desc,
                isPublic,
                isPopup,
                isEmail,
                secPre,
                secsPos,
                isActive,
                emailList,
                creationDate,
                gifRequired,
                videoRequired,
                alarmCategoryId,
                zoneRestrictionIdEntry,
                zoneRestrictionNameEntry,
                zoneRestrictionIdExit,
                zoneRestrictionNameExit,
                isZoneRestriction,
                zoneGeofence,
                zoneRuleIdEntry,
                zoneRuleNameEntry,
                zoneRuleIdExit,
                zoneRuleNameExit,
                cameraType,
                cameraTypeId
            ]);
        } catch (error) {
            throw error;
        }
    }

    updateStreamaxRule = async (sessionId, {idRule, idVehicle, idFleet, idAlarm, ruleName, desc, isPublic, isPopup, isEmail, secPre, secsPos, isActive, emailList, creationDate, gifRequired, videoRequired, alarmCategoryId, zoneRestrictionIdEntry, zoneRestrictionNameEntry, zoneRestrictionIdExit, zoneRestrictionNameExit, isZoneRestriction, zoneGeofence, zoneRuleIdEntry, zoneRuleNameEntry, zoneRuleIdExit, zoneRuleNameExit, cameraType, cameraTypeId}) => {
        try {
            return await query('SELECT * FROM update_streamax_rules_fn($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30) AS QUERY', [
                idRule,
                sessionId,
                idVehicle,
                idFleet,
                idAlarm,
                ruleName,
                desc,
                isPublic,
                isPopup,
                isEmail,
                secPre,
                secsPos,
                isActive,
                emailList,
                creationDate,
                gifRequired,
                videoRequired,
                alarmCategoryId,
                zoneRestrictionIdEntry,
                zoneRestrictionNameEntry,
                zoneRestrictionIdExit,
                zoneRestrictionNameExit,
                isZoneRestriction,
                zoneGeofence,
                zoneRuleIdEntry,
                zoneRuleNameEntry,
                zoneRuleIdExit,
                zoneRuleNameExit,
                cameraType,
                cameraTypeId
            ]);
        } catch (error) {
            throw error;
        }
    }

    deleteStreamaxRules = async (sessionId, {idRule}) => {
        try {
            return await query('SELECT * FROM delete_streamax_rules_fn($1,$2) AS QUERY', [
                idRule,
                sessionId,
            ]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new StreamaxService();