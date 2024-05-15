const routes = require('express').Router();
const baseRouter = require('express').Router();
const fileUpload = require('express-fileupload');

const TemplateController = require('../controllers/templateService.controller');
const TemplateMiddleware = require('../middlewares/templateService.middleware');
const TokenMiddleware = require('../middlewares/token.middleware');

const upload = fileUpload({
    tempFileDir: './ev-temp',
    safeFileNames: true,
    preserveExtension: true,
    limits: {
      fileSize: 100 * 1024 * 1024
    }
  });

routes.post('/template', upload, TemplateMiddleware.addTemplate, TemplateController.addTemplate); // Subir plantilla
routes.put('/template', upload, TemplateMiddleware.updateTemplate, TemplateController.updateTemplate); // Eliminar y subir nueva
routes.delete('/module/template', TemplateMiddleware.deleteTemplate, TemplateController.deleteTemplate); // Eliminar plantilla
routes.get('/template', TemplateMiddleware.getTemplate, TemplateController.getTemplate); // Obtener plantilla con base64
routes.get('/all/template', TokenMiddleware.verify, TemplateController.getTemplates); // Obtener plantillas

baseRouter.use('/api', routes);

module.exports = baseRouter;
