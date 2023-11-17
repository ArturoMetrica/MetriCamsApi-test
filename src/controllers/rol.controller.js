const DBService = require('../services/database');
const dbService = new DBService();

class RolController {
  getRol = async (req, res) => {
    try {
      const data = await dbService.getSecurityRoles(req.headers.sessionid);

      res.status(200).send(data);
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/securityroles');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  createRol = async (req, res) => {
    try {
      const { id, name, permissions, action, idGroup } = req.rol;

      const data = await dbService.spSecurityRoles([
        id,
        name,
        JSON.stringify(permissions),
        action,
        req.headers.sessionid,
        idGroup
      ]);

      res.status(200).send(data);
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/securityroles');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  updateRol = async (req, res) => {
    try {
      const { id, name, permissions, action, idGroup } = req.rol;

      const data = await dbService.spSecurityRoles([
        id,
        name,
        JSON.stringify(permissions),
        action,
        req.headers.sessionid,
        idGroup
      ]);

      res.status(200).send(data);
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/securityroles');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  deleteRol = async (req, res) => {
    try {
      const { id, name, permissions, action, idGroup } = req.rol;

      const data = await dbService.spSecurityRoles([
        id,
        name,
        JSON.stringify(permissions),
        action,
        req.headers.sessionid,
        idGroup
      ]);

      res.status(200).send(data);
    } catch (error) {
      await dbService.errorLogs('API', error, '/api/securityroles');

      res.status(500).json({
        code: 500,
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}

module.exports = new RolController();

/********************* Propiedad de Métrica Móvil SA de CV **************************/