const DBService = require('../services/database')
const dbService = new DBService()

class CodeGroupRepository {
	get(codeGroup) {
		return dbService.getCodeGroups(codeGroup)
	}

	update(codeGroup) {
		return dbService.updateCodeGroup(codeGroup)
	}

	delete(codeGroup) {
		return dbService.deleteCodeGroup(codeGroup)
	}
}

module.exports = new CodeGroupRepository()

/********************* Propiedad de Métrica Móvil SA de CV **************************/