const DBService = require('../services/database')
const dbService = new DBService()

class AlarmConfigRepository {
	async get(AlarmConfig) {
		return dbService.getAlarmConfig(AlarmConfig)
	}

	async create(AlarmConfig) {
		return dbService.createAlarmConfig(AlarmConfig)
	}

	async update(AlarmConfig) {
		return dbService.updateAlarmConfig(AlarmConfig)
	}

	async delete(AlarmConfig) {
		return dbService.deleteAlarmConfig(AlarmConfig)
	}
}

module.exports = new AlarmConfigRepository()

/********************* Propiedad de Métrica Móvil SA de CV **************************/