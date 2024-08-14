const snapService = require('../services/snap.service');
const DBService = require('../services/database');
const { errorLogs } = new DBService();
const { sendMsg, sendErr } = require('../helpers/responses.helper');
const snapHelper = require('../helpers/facialRec.helper');

const getSnaps = async (req, res) => {
    try {
        const { mdvr, firstDate, lastDate } = req.snaps;
        const { data } = await snapService.getSnapsByMDVR(mdvr, firstDate, lastDate);

        res.status(200).json({
            status: true,
            message: '',
            data
          });
    } catch (error) {
        await errorLogs('API', error, '/api/snaps');

        res.status(500).json({
            status: false,
            message: error.message || error,
            data: null
        });
    }
}

const getVehiclesWithSnaps = async (req, res) => {
    try {
        const { data } = await snapService.getVehiclesWithSnaps();
        
        return res.status(200).json({
            status: true,
            message: '',
            data
          });
    } catch (error) {
        await errorLogs('API', error, '/api/snaps/vehicles');

        return res.status(500).json({
            status: false,
            message: error.message || error,
            data: null
        });
    }
}

const getSnapDates = async (req, res) => {
    try {
        const { mdvr } = req.snap;
        const data = await snapService.getSnapDatesByMDVR(mdvr);

        return res.status(200).json({
            status: true,
            message: data.message,
            data: data.data
          });
    } catch (error) {
        await errorLogs('API', error, '/api/snaps/dates');

        return res.status(500).json({
            status: false,
            message: error.message || error,
            data: null
        });
    }
}

const getDataUsage = async (req, res) => {
    try {
        const { vehicles, offSet } = req.usage;
        const usage = await snapService.getDataUsage(vehicles, offSet);

        if (usage.data === null) {
            usage.data = [];
        }

        else {
        usage.data.forEach(e => {
            const p = (e.snaps_quantity * 100)/5760;
            e.percent = p.toFixed(2);
        });
    }

        return res.status(200).json({
            status: true,
            message: '',
            data: usage.data
        });
    } catch (error) {
        await errorLogs('API', error, '/api/snaps/data-usage');

        return res.status(500).json({
            status: false,
            message: error.message || error,
            data: null
        });
    }
}

const getLastsSnapshots = async (req, res) => {
    try {
        const { sessionid, serials, rowsOffset, rowsLimit } = req.snaps;
        const snaps = await snapService.getLastsSnapshots(sessionid, serials, rowsOffset, rowsLimit);

        if (!snaps.data.length) throw 'No images available, try again later';

        const data = await Promise.all(snaps.data.map(async (device) => {
            const imgData = await snapHelper.getImg(device.snap_name);
            const imgBase64 = imgData.data.imgBase64;
            return {
                ...device,
                base64: imgBase64
            };
          }));

        return res.status(200).json({
            status: true,
            message: snaps.message,
            data,
            totalRows: snaps.total_rows
        });
    } catch (error) {
        await errorLogs('API', error, '/api/snaps/last-snaps');

        return res.status(500).json({
            status: false,
            message: error.message || error,
            data: null
        });
    }
}

module.exports = {
	getSnaps,
    getVehiclesWithSnaps,
    getSnapDates,
    getDataUsage,
    getLastsSnapshots
}

    // getSnaps = async (req, res) => {
    //     try {
    //         const { mdvr, firstDate, lastDate } = req.snap;
    //         const snaps = await snapService.getSnaps(mdvr, firstDate, lastDate);
    //         return res.status(200).json(sendMsg({ data: snaps }));
    //     } catch (error) {
    //         return res.status(error.sCode || 400).json(sendErr(error));
    //     }
    // }

    // getVehiclesWithSnaps = async (req, res) => {
    //     try {
    //         const vehicles = await snapService.getVehiclesWithSnaps();
    //         return res.status(200).json(sendMsg(vehicles));
    //     } catch (error) {
    //         return res.status(error.sCode || 400).json(sendErr(error));
    //     }
    // }

    // getSnapDates = async (req, res) => {
    //     try {
    //         const { mdvr } = req.snap;
    //         const dates = await snapService.getSnapDatesByMDVR(mdvr);
    //         return res.status(200).json(sendMsg(dates));
    //     } catch (error) {
    //         return res.status(error.sCode || 400).json(sendErr(error));
    //     }
    // }

    // getDataUsage = async (req, res) => {
    //     try {
    //         const { vehicles, offSet } = req.usage;
    //         const usage = await snapService.getDataUsage(vehicles, offSet);

    //         if (usage.data === null) {
    //             usage.data = [];
    //         }

    //         else {

    //         usage.data.forEach(e => {
    //             const p = (e.snaps_quantity * 100)/5760;
    //             e.percent = p.toFixed(2);
    //         });
    //     }

    //         return res.status(200).json(sendMsg(usage));
    //     } catch (error) {
    //         return res.status(error.sCode || 400).json(sendErr(error));
    //     }
    // }

    // getLastsSnapshots = async (req, res) => {
    //     try {
    //         const { sessionid, serials, rowsOffset, rowsLimit } = req.snaps;
    //         const snaps = await snapService.getLastsSnapshots(sessionid, serials, rowsOffset, rowsLimit);

    //         if (!snaps.data.length) throw 'No images available, try again later';

    //         // Lógica para devolver base64 de las imagenes
    //         const data = await Promise.all(snaps.data.map(async (device) => {
    //             const imgData = await snapHelper.getImg(device.snap_name);
    //             const imgBase64 = imgData.data.imgBase64;
    //             return {
    //                 ...device,
    //                 base64: imgBase64
    //             };
    //           }));

    //         return res.status(200).json({
    //             status: true,
    //             message: snaps.message,
    //             data,
    //             totalRows: snaps.total_rows
    //         });
    //     } catch (error) {
    //         return res.status(error.sCode || 400).json(sendErr(error));
    //     }
    // }