const surfsightService = require('../services/surfsight.service');
const moment = require('moment');
const recording = async ({ token, imei, cameraType, start, videoDuration, qualityLevel }) => {
  try {
    const { data: media } = await surfsightService.connectMedia(token, imei);
    const date = moment.utc(start);
    return `https://${media.address}/download/${imei}/${media.mediaToken}/${imei}_${cameraType}_${(date.valueOf())}_${videoDuration}_${qualityLevel}.mp4`;
  } catch (error) {
    throw error;
  }
}

const streaming = async (token, imei, cameraType) => {
  try {
    const { data: media } = await surfsightService.connectMedia(token, imei);

    return 'https://' + media.address + '/' + imei + '/' + cameraType + '/' + media.mediaToken + '/playlist.m3u8';
  } catch (error) {
    throw error;
  }
}

module.exports = {
  recording,
  streaming
}