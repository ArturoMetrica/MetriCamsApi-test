const DBService = require('../services/database')
const dbService = new DBService()

class DriverRepository {
	get(driver) {
		return dbService.getDriver(driver)
	}

	create(driver) {
		return dbService.createDriver(driver)
	}

	update(driver) {
		return dbService.updateDriver(driver)
	}

	delete(driver) {
		return dbService.deleteDriver(driver)
	}
}

module.exports = new DriverRepository()

/********************* Propiedad de Métrica Móvil SA de CV **************************/