const router = require('express').Router()
const TemplateMiddleware = require('../middlewares/template.middleware')
const DBService = require('../services/database');
const dbService = new DBService();

router.get('/api/templates', TemplateMiddleware.get, async (req, res) => {
  try {
    const result = await dbService.getTemplates(req.template)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message)
  }
})
router.post('/api/templates', TemplateMiddleware.create, async (req, res) => {
  try {
    const result = await dbService.insertTemplate(req.template)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message)
  }
})
router.put('/api/templates/:id', TemplateMiddleware.update, async (req, res) => {
  try {
    const result = await dbService.updateTemplate(req.template)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message)
  }
})
router.delete('/api/templates/:id', TemplateMiddleware.delete, async (req, res) => {
  try {
    const result = await dbService.deleteTemplate(req.template)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

module.exports = router

/********************* Propiedad de Métrica Móvil SA de CV **************************/