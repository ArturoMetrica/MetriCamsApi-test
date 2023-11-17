const DBService = require('../services/database')
const dbService = new DBService()

class ReportsRepository {
	get(report) {
		return dbService.getReportConfig(report)
	}

	getVisibility(report) {
		return dbService.getReportVisibilityConfig(report)
	}

	create(report) {
		return dbService.createReportConfig(report)
	}

	update(report) {
		return dbService.updateReportConfig(report)
	}

	delete(report) {
		return dbService.deleteReportConfig(report)
	}

	getTimezones(timezones) {
		return dbService.getTimezones(timezones)
	}
}

module.exports = new ReportsRepository()

/********************* Propiedad de Métrica Móvil SA de CV **************************/