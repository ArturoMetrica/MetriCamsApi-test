const { callByUser } = require('../helpers/sso.helper');
const isValidEmail = require('../helpers/validateEmail');
const GeotabService = require('../services/geotab.service');
const geotabService = new GeotabService();

const DBService = require('../services/database');
const DbService = new DBService();

class GeotabDriverController {
  getDriver = async (req, res) => {
    try {
      const { id, s } = req.driver;
      const user = JSON.parse(Buffer.from(s, 'base64').toString());
      const data = (await callByUser(user, 'Get', {
        typeName: 'User',
        search: {
          id,
          isDriver: true
        }
      })).map(driver => ({
        id: driver.id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        email: isValidEmail(driver.name) ? driver.name : undefined,
      }));

      res.status(200).json({
        status: true,
        message: '',
        data
      });
    } catch (error) {
      await DbService.errorLogs('API', error, '/api/geotab/driver');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  getDriverList = async (req, res) => {
    try {
      const data = await geotabService.getDriverList();

      res.status(200).json({
        status: true,
        message: '',
        data
      })
    } catch (error) {
      await DbService.errorLogs('API', error, 'api/geotab/driversList');

      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}

module.exports = new GeotabDriverController();