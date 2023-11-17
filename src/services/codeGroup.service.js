const CodeGroupRepository = require('../repositories/codeGroup.repository.js')

class CodeGroupService {
  async get(codeGroup) {
    return CodeGroupRepository.get(codeGroup)
  }

  async update(codeGroup) {
    return CodeGroupRepository.update(codeGroup)
  }

  async delete(codeGroup) {
    return CodeGroupRepository.delete(codeGroup)
  }
}

module.exports = new CodeGroupService()

/********************* Propiedad de Métrica Móvil SA de CV **************************/