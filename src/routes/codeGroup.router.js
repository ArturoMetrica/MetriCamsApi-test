const router = require('express').Router()
const CodeGroupController = require('../controllers/codeGroup.controller.js')
const CodeGroupMiddleware = require('../middlewares/codeGroup.middleware.js')

router.get(
	'/api/groups/code',
	CodeGroupMiddleware.get,
	CodeGroupController.get
)
router.put(
	'/api/groups/:id/code',
	CodeGroupMiddleware.update,
	CodeGroupController.update
)
router.delete(
	'/api/groups/:id/code',
	CodeGroupMiddleware.delete,
	CodeGroupController.delete
)

module.exports = router

/********************* Propiedad de Métrica Móvil SA de CV **************************/