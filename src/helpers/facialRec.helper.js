const { bucketService } = require('../config/env');
const FormData = require('form-data');
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
});
class FacialRec {
  uploadImg = async (img) => {
    try {
      const buffer = Buffer.from(img, 'base64');
      const formData = new FormData();
      formData.append('evidenceData', buffer);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: bucketService.baseURL + bucketService.uploadProfile,
        headers: {
          'API-Key': bucketService.apiKey,
          ...formData.getHeaders()
        },
        data: formData
      };
      const {
        data
      } = await axios(config);
      return data.downloadId;
    } catch (error) {
      throw new Error('Failed to upload images');
    }
  };

  getImg = async (downloadId) => {
    try {
      const getImgConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: bucketService.baseURL + bucketService.get,
        headers: {
          'API-Key': bucketService.apiKey,
          'token': bucketService.token
        },
        params: {
          downloadId
        }
      };
      return await axios(getImgConfig);
    } catch (error) {
      throw new Error('Failed to download image');
    }
  }

  deleteImg = async (downloadId) => {
    try {
      const getImgConfig = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: bucketService.baseURL + bucketService.deleteProfile,
        headers: {
          'API-Key': bucketService.apiKey,
        },
        params: {
          downloadId,
          'token': bucketService.token
        }
      };
      return await axios(getImgConfig);
    } catch (error) {
      throw new Error('Failed to delete image');
    }
  }
}

module.exports = new FacialRec();