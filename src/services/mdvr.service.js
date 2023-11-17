const mdvrApiService = require('../config/env').mdvrApiSevice;

const axios = require('axios');
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

class mdvrService {
  login = async (d) => {
    try {
      const { data } = await axios.post(mdvrApiService.baseURL + mdvrApiService.login,
        { d },
        {
          headers: { "api-key": mdvrApiService.apiKey },
        }
      );

      return data;
    } catch (error) {
      throw error
    }
  }

  getMdvrOffset = async (token, mdvrArray) => {
    try {
      const { data, status } = await axios.get(mdvrApiService.baseURL + mdvrApiService.offset, {
        headers: { "api-key": mdvrApiService.apiKey, token },
        params: { mdvrArray },
      });

      return data;
    } catch (error) {
      throw error
    }
  }
}

module.exports = new mdvrService();

/********************* Propiedad de Métrica Móvil SA de CV **************************/