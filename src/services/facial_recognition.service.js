const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const { baseURL, driverCode, generateCodes, getCodes, deleteCodes, deleteDriverCode, apiKeyName, apiKeyValue } = require('../config/env').facialRecService;

class FacialRecognition {

    async generatePicturesCodes (nss, clientName, pictureQuantity) {
        try {
            const { data } = await axios.post(baseURL + generateCodes, 
                {
                    nss,
                    clientName,
                    pictureQuantity
                },
                { headers: { "api-key": apiKeyValue },
            });

            return data ? data : null;
        } catch (error) {
            if (error.response)
            return error.response.data;
        }
    }

    async getPicturesCodes (nss, clientName) {
        try {
            const { data } = await axios.get(baseURL + getCodes,
                {
                    params: { nss, clientName},
                    headers: { "api-key": apiKeyValue },
                });

                return data ? data : null;
        } catch (error) {
            if (error.response)
                return error.response.data;
        }
    }

    async deleteDriverPicturesCodes (nss, clientName, pictures) {
        try {
            const { data } = await axios.delete(baseURL + deleteCodes, 
                {
                    params: { nss, clientName, pictures },
                    headers: { "api-key": apiKeyValue },
            });

            return data ? data : null;
        } catch (error) {
            if (error.response)
            return error.response.data;
        }
    }

    async createDriver (clientName) {
        try {
            const { data } = await axios.post(baseURL + driverCode,
                {
                    clientName
                },
                {
                    headers: { "api-key": apiKeyValue },
            });

            return data ? data.data : null;
        } catch (error) {
            if (error.response)
            return error.response.data;
        }
    }

    async deleteDriver (nss) {
        try {
            const { data } = await axios.delete(baseURL + deleteDriverCode,
                {
                    params: { nss },
                    headers: { "api-key": apiKeyValue },
            });

            return data ? data.data : null;
        } catch (error) {
            if (error.response)
            return error.response.data;
        }
    }
}

module.exports = new FacialRecognition();