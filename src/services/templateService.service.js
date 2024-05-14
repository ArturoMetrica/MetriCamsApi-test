const { query } = require('./dbconnection');

class TemplateService {
    addTemplate = async (sessionid, templateName, templateType, downloadId, isDefault) => {
        try {
            const result = await query('SELECT * FROM insert_template_report_fn($1,$2,$3,$4,$5) AS QUERY', [
                sessionid,
                templateName,
                templateType,
                downloadId,
                isDefault
            ]);

            if (result[0] && result[0].query) return result[0].query;
        } catch (error) {
            throw error;
        }
    }

    updateTemplate = async (sessionid, templateId, templateName, templateType, downloadId) => {
        try {
            const result = await query('SELECT * FROM update_template_report_fn($1,$2,$3,$4,$5) AS QUERY', [
                sessionid,
                templateId,
                templateName,
                templateType,
                downloadId
            ]);

            if (result[0] && result[0].query) return result[0].query;
        } catch (error) {
            throw error;
        }
    }

    deleteTemplate = async (sessionid, templateId, templateType) => {
        try {
            const result = await query('SELECT * FROM delete_template_report_fn($1,$2,$3) AS QUERY', [
                sessionid,
                templateId,
                templateType
            ]);

            if (result[0] && result[0].query) return result[0].query;
        } catch (error) {
            throw error;
        }
    }

    getTemplates = async (sessionid) => {
        try {
            const result = await query('SELECT * FROM get_all_templates($1) AS QUERY', [
                sessionid
            ]);

            if (result[0] && result[0].query.data) return result;
        } catch (error) {
            throw error;
        }
    }

    getTemplate = async (sessionid, templateId) => {
        try {
            const result = await query('SELECT * FROM get_template_report_fn($1,$2) AS QUERY', [
                sessionid,
                templateId
            ]);

            if (result[0] && result[0].query.data) return result[0].query;
        } catch (error) {
            
        }
    }
}

module.exports = new TemplateService();