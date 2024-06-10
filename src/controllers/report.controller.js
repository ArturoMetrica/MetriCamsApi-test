const moment = require('moment');

const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
const ReportsService = require('../services/report.service.js');
const DBService = require('../services/database');
const dbService = new DBService();

const { baseUrl, apiKeyName, apiKeyValue, deleteTemplate } = require('../config/env').genExcel;

const formatReport = async (startTime, endTime, vehicles, rules, drivers, language, initialDay, offset, geotab = false) => {
	const data = !geotab ?
		await dbService.getAdvancedReport(startTime, endTime, vehicles, rules, language, offset, drivers) :
		await dbService.getGeotabReport(startTime, endTime, vehicles, rules, language, offset, drivers);
	
	return data.map(e => {
		let startWeek = moment(e.date).startOf('week').add(initialDay, 'days')
		if (startWeek.isAfter(e.date)) startWeek = moment(e.date).subtract(7, 'days').startOf('week').add(initialDay, 'days');

		return {
			...e,
			datetime: moment(e.date).format('DD/MM/YYYY'),
			date: `${moment(e.date).format('HH:mm:ss ')}UTC${offset}`,
			week: `${(startWeek.format('DD/MM/YYYY'))} - ${(startWeek.add(6, 'days').format('DD/MM/YYYY'))}`,
			attendedTime: e.attendedTime ? moment(e.attendedTime).format('DD/MM/YYYY HH:mm:ss') : '',
		}
	});
}

class ReportsController {
	async get(req, res, next) {
		try {
			const data = await ReportsService.get(req.report)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/reports');

			res
				.status(error.code || 400)
				.json({ ok: false, error: { message: error.message || 'Bad request' } })
		}
	}

	async getVisibility(req, res, next) {
		try {
			const data = await ReportsService.getVisibility(req.report)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/reports/visibility');

			res
				.status(error.code || 400)
				.json({ ok: false, error: { message: error.message || 'Bad request' } })
		}
	}

	async getTimezones(req, res, next) {
		try {
			const data = await ReportsService.getTimezones(req.timezones)
			res.status(200).json({ ok: true, data })
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/reports/timezones');

			res
				.status(error.code || 400)
				.json({ ok: false, error: { message: error.message || 'Bad request' } })
		}
	}

	async create(req, res, next) {
		try {
			const data = await ReportsService.create(req.report)
			res.status(201).json({ ok: true, data })
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/reports');

			res
				.status(error.code || 400)
				.json({ ok: false, error: { message: error.message || 'Bad request' } })
		}
	}

	async update(req, res, next) {
		try {
			const data = await ReportsService.update(req.report)
			res.status(202).json({ ok: true, data })
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/reports/:id');

			res
				.status(error.code || 400)
				.json({ ok: false, error: { message: error.message || 'Bad request' } })
		}
	}

	async delete(req, res, next) {
		try {
			const data = await ReportsService.delete(req.report)
			res.status(202).json({ ok: true, data })
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/reports/:id');

			res
				.status(error.code || 400)
				.json({ ok: false, error: { message: error.message || 'Bad request' } })
		}
	}

	getAdvancedReport = async (req, res) => {
		try {
			const { startTime, endTime, vehicles, rulesS, rulesG, drivers, language, initialDay, offset } = req.report;

			const dateLimit = moment(startTime).add(30, 'days').format('YYYY-MM-DD HH:mm:ss');

            if (endTime > dateLimit) {
                throw 'You can not query more than 30 days.';
            }

			const streamax = await formatReport(startTime, endTime, vehicles, rulesS, drivers, language, initialDay, offset);
			const geotab = await formatReport(startTime, endTime, vehicles, rulesG, drivers, language, initialDay, offset, true);
			const data = {
				streamax,
				geotab
			}

			res.status(200).json({
				status: true,
				message: '',
				data
			});
		} catch (error) {
			await dbService.errorLogs('API', error, '/api/advanced-report');

			res.status(500).json({
				status: false,
				message: error.message || error,
				data: null
			});
		}
	}

	deleteExcel = async (req, res) => {
		try {
			const { id } = req.report;
			const headers = {};
      		headers[apiKeyName] = apiKeyValue;

			const { data } = await axios.delete(`${baseUrl}${deleteTemplate}${id}`, 
			{
				headers
			});

			if (data.ok != true) throw new Error(data.message);

			res.status(200).json({
				status: true,
				message: "The template has been deleted.",
				data: ''
			});
		} catch (error) {
			res.status(500).json({
				status: false,
				message: error.message || error,
				data: null
			});
		}
	}

}

module.exports = new ReportsController()
