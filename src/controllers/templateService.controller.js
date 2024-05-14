const TemplateService = require('../services/templateService.service');
const TemplateHelper = require('../helpers/template.helper');
const DBService = require('../services/database');
const { errorLogs } = new DBService();

class TemplateController {
    addTemplate = async (req, res) => {
        try {
            // Subir plantilla a través de servicio
            if (!req.file && !req.files) {
                return res.status(400).send('No files were uploaded.');
              }
          
              if (!req.file && req.files && req.files.template) {
                req.file = req.files.template;
              }
            const downloadId = await TemplateHelper.uploadTemplate(req.file);

            if (!downloadId) throw { status: false, message: 'Template upload failed. Try again', data: null };

            const data = await TemplateService.addTemplate(req.sessionid.sessionid, req.body.templateName, req.body.templateType, downloadId, false);

            if (data.code != 200) {
                await TemplateHelper.deleteTemplate(downloadId);
                throw data.message;
            }

            res.status(data.code || 200).json({
                status: true,
                message: data.message,
                data: ''
            });
        } catch (error) {
            await errorLogs('API', error, '/api/template');

            res.status(500).json({
                status: false,
                message: error.error || error,
                data: null
            });
        }
    }

    updateTemplate = async (req, res) => {
        try {
            if (req.body.isDefault === true) throw { status: false, message: 'This template can not be deleted.', data: null };

            if (!req.file && !req.files) { return res.status(400).send('No files were uploaded.'); }
          
              if (!req.file && req.files && req.files.template) { req.file = req.files.template; }

            await TemplateHelper.deleteTemplate(req.body.downloadId);
            const downloadId = await TemplateHelper.uploadTemplate(req.file);
            const data = await TemplateService.updateTemplate(req.sessionid.sessionid, req.body.templateId, req.body.templateName, req.body.templateType, downloadId);

            res.status(data.code || 200).json({
                status: true,
                message: data.message,
                data: ''
            });
        } catch (error) {
            await errorLogs('API', error, '/api/template');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    deleteTemplate = async (req, res) => {
        try {

            if (req.query.isDefault === true) throw { status: false, message: 'You can not delete a default template.', data: null };

            const data = await TemplateService.deleteTemplate(req.sessionid.sessionid, req.query.templateId, req.query.templateType);

            if(data.code !== 200) throw data.message; 

            await TemplateHelper.deleteTemplate(req.query.downloadId);

            res.status(data.code || 200).json({
                status: true,
                message: data.message,
                data: ''
            });
        } catch (error) {
            await errorLogs('API', error, '/api/template');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    getTemplates = async (req, res) => {
        try {
            const data = await TemplateService.getTemplates(req.sessionid.sessionid);

            res.status(data[0].query.code || 200).json(data[0].query);
        } catch (error) {
            await errorLogs('API', error, '/api/template');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }

    getTemplate = async (req, res) => {
        try {
            let data = await TemplateService.getTemplate(req.sessionid.sessionid, req.query.templateId);

            // Integrar base64 para descargar plantilla
            if (!data.data[0]) throw 'This template does not exist.'

            const base64 = await TemplateHelper.downloadTemplate(data.data[0].downloadId);
            data.data[0].base64 = base64.data.excelBase64;

            res.status(data.code || 200).json(data);
        } catch (error) {
            await errorLogs('API', error, '/api/template');

            res.status(500).json({
                status: false,
                message: error.message || error,
                data: null
            });
        }
    }
}

module.exports = new TemplateController();