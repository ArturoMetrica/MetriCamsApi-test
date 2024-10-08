const { query } = require('./dbconnection');

    const getSnapsByMDVR = async (mdvr, firstDate, lastDate) => {
        try {
            const result = await query('SELECT snaps_sel_between_dates_fn($1, $2, $3) AS DATA', [
                mdvr,
                firstDate,
                lastDate
            ]);

            if (result[0] && result[0].data) return result[0].data;
        } catch (error) {
            throw { message: error, area: 'DB' };
        }
    };

    const addDevice = async (token, vehicleId, deviceData, cameras) => {
        try {
            return await query('SELECT * FROM add_new_device_fn($1,$2,$3,$4) AS QUERY', [
                token,
                vehicleId,
                deviceData ? JSON.stringify(deviceData) : '[]',
                cameras ? JSON.stringify(cameras) : '[]',
            ]);
        } catch (error) {
            throw error;
        }
    }

    const getVehiclesWithSnaps = async () => {
        try {
            const result = await query('SELECT snap_sel_mdvr_av_fn() AS DATA', []);

            if (result[0] && result[0].data) return result[0].data;
        } catch (error) {
            throw { message: error, area: 'DB' };
        }
    }

    const getSnapDatesByMDVR = async (mdvr) => {
        try {
            const result = await query('SELECT snaps_sel_dates_av_fn($1) AS DATA', [
                mdvr
            ]);

            if (result[0] && result[0].data) return result[0].data;
        } catch (error) {
            throw { message: error, area: 'DB' };
        }
    }

    const getDataUsage = async (vehicles, offSet) => {
        try {
            const result = await query('SELECT snaps_limit_usage_fn_test($1, $2) AS DATA', [
                vehicles,
                offSet
            ]);

            if (result[0] && result[0].data) return result[0].data;
        } catch (error) {
            throw { message: error, area:'DB' };
        }
    };

    const getLastsSnapshots = async (token, serials, rowOffset, rowsLimit) => {
        try {
            const result = await query('SELECT * FROM get_last_snap_by_vehicle($1::TEXT,$2,$3::INT,$4::INT) AS DATA', [
                token,
                serials,
                rowOffset,
                rowsLimit
            ]);

            if (result[0] && result[0].data) return result[0].data;
        } catch (error) {
            throw { message: error.where, area: 'BD '};
        }
    };

    module.exports = {
        getSnapsByMDVR,
        addDevice,
        getVehiclesWithSnaps,
        getSnapDatesByMDVR,
        getDataUsage,
        getLastsSnapshots
    };