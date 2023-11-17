const axios = require('axios').default

class DriverFR {
    async createDriverFR(driverCode, driverName, fleetId) {
        try {
          const { data }= await axios.post('http://104.197.95.136/ft-adapter/api/driver',
            {
              driverCode,
              driverName,
              fleetId
            });
    
          return data ? data : null;
        } catch (error) {
          return null;
        }
      }
    
      async getDriverPage(driverIds, driverCode, driverName, fleetIds, page, pageSize) {
        try {
          const { data } = await axios.get('http://104.197.95.136/ft-adapter/api/driver',
            {
            params: { driverIds, driverCode, driverName, fleetIds, page, pageSize }
            });
    
          return data ? data : null;
        } catch (error) {
          return null;
        }
      }
}

module.exports = new DriverFR();