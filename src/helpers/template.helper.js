const { bucketService } = require('../config/env');
const FormData = require('form-data');
const axios = require('axios').default;
const axiosRetry = require('axios-retry');

axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
});

class TemplateHelper {
    uploadTemplate = async (file) => {
        try {
            const buffer = Buffer.from(file.data, 'base64');
            const formData = new FormData();
            formData.append('template', buffer);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: bucketService.baseURL + bucketService.uploadTemplate,
                headers: {
                'API-Key': bucketService.apiKey,
                ...formData.getHeaders()
                },
                data: formData
            };
            const { data } = await axios(config);
            return data.downloadId;
        } catch (error) {
            throw new Error('Failed to upload template');
        }
    };

    downloadTemplate = async (downloadId) => {
        try {
            const getTemplateConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: bucketService.baseURL + bucketService.downloadTemplate,
                headers: {
                    'API-Key': bucketService.apiKey,
                    'token': bucketService.token
                },
                params: {
                    downloadId
                }
            };
            return await axios(getTemplateConfig);
        } catch (error) {
            throw new Error('Failed to download template');
        }
    };

    deleteTemplate = async (downloadId) => {
        try {
            const getTemplateConfig = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: bucketService.baseURL + bucketService.deleteTemplate,
                headers: {
                    'API-Key': bucketService.apiKey,
                },
                params: {
                    downloadId,
                    'token': bucketService.token
                }
            };
            return await axios(getTemplateConfig);
        } catch (error) {
            throw new Error('Failed to delete template');
        }
    }
}

module.exports = new TemplateHelper();