const ReportsRepository = require('../repositories/report.repository.js')

class ReportsService {
	async get(report) {
		return ReportsRepository.get(report)
	}

	async getVisibility(report) {
		return ReportsRepository.getVisibility(report)
	}

	async create(report) {
		return ReportsRepository.create(report)
	}

	async update(report) {
		return ReportsRepository.update(report)
	}

	async delete(report) {
		return ReportsRepository.delete(report)
	}

	async getTimezones(timezones) {
		return ReportsRepository.getTimezones(timezones)
	}
}

module.exports = new ReportsService()

/********************* Propiedad de Métrica Móvil SA de CV **************************/