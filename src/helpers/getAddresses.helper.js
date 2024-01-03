const GeotabService = require("../services/geotab.service");
const sleepHelper = require("./sleep.helper");
const geotabService = new GeotabService();

const getCoordinates = (arr) => {
  try {
    return arr.map(e => ({ y: e.latitude, x: e.longitude }));
  } catch (error) {
    throw error;
  }
}

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};


const getAddresses = async (arr) => {
  try {
    const coordinates = getCoordinates(arr);
    return await geotabService.getAddresses(coordinates, 5000);
  } catch (error) {
    throw error;
  }
};


module.exports = getAddresses;