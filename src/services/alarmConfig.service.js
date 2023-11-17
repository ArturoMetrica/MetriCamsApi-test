const AlarmConfigRepository = require('../repositories/alarmConfig.repository.js')
class AlarmConfigService {
	async get(AlarmConfig) {
		const result = await AlarmConfigRepository.get(AlarmConfig)
		if (
			!result ||
			!result.data ||
			!result.data.length ||
			!result.data[0] ||
			!result.data[0].query
		)
		throw new Error(result.message || 'Invalid result')
		return result.data[0].query.data || {}
	}

	async create(AlarmConfig) {
		const result = await AlarmConfigRepository.create(AlarmConfig)
		if (
			!result ||
			!result.data ||
			!result.data.length ||
			!result.data[0] ||
			!result.data[0].query ||
			!result.data[0].query.data
		)
			throw new Error(result.message || 'Invalid result')
		return result.data[0].query.data
	}

	async update(AlarmConfig) {
		const result = await AlarmConfigRepository.update(AlarmConfig)
		if (
			!result ||
			!result.data ||
			!result.data.length ||
			!result.data[0] ||
			!result.data[0].query ||
			!result.data[0].query.data
		)
		throw new Error(result.message || 'Invalid result')
		return result.data[0].query.data
	}

	async delete(AlarmConfig) {
		const result = await AlarmConfigRepository.delete(AlarmConfig)
		if (
			!result ||
			!result.data ||
			!result.data.length ||
			!result.data[0] ||
			!result.data[0].query ||
			!result.data[0].query.data
		)
		throw new Error(result.message || 'Invalid result')
		return result.data[0].query.data
	}
}

module.exports = new AlarmConfigService()

/********************* Propiedad de Métrica Móvil SA de CV **************************/