const { createFleet, getFleetList, updateFleet, deleteFleet } = require("../services/FT_API.service");

const DBService = require('../services/database');
const dbService = new DBService();


const findChildren = (g, groups) => {
  return {
    ...g,
    children: groups.filter((c) => c.parentId === g.id).map((e) => findChildren(e, groups))
  };
}

const multiTree = (groups) => {
  const roots = groups.filter((g) => !groups.map((g) => g.id).includes(g.parentId));
  const trees = roots.map((rootGroup) => findChildren(rootGroup || {}, groups));
  return trees;
}

class GroupController {
  createGroup = async (req, res) => {
    try {
      const { action, groupName, parentFleetId, parentStreamaxFleetId } = req.group;

      const name = groupName.replace(/[^\w\s]/g, ''); // Elimina caracteres especiales de la cadena.

      const ftData = await createFleet(name, parentStreamaxFleetId);

      if (!ftData && !ftData.data && !ftData.data.fleetId)
        return res.status(500).json({
          status: false,
          message: 'Failed to create streamax fleet',
          data: null
        });

      const data = await dbService.groupManagement(action, req.sessionid.sessionid, null, name, parentFleetId, ftData.data.fleetId, parentStreamaxFleetId, name != groupName ? groupName : null);

      res.status(200).json({
        status: true,
        message: '',
        data
      });
    } catch (error) {
      await deleteFleet(error.message.split('|')[1]);
      res.status(500).json({
        status: false,
        message: error.message.split('|')[0] || error,
        data: null
      });
    }
  }

  getGroup = async (req, res) => {
    try {
      const { } = req.group;


      const { data: groups } = await dbService.getGroups(req.sessionid.sessionid);
      const data = multiTree(groups[0].data);

      res.status(200).json({
        status: true,
        message: '',
        data
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  updateGroup = async (req, res) => {
    try {
      const { action, groupName, fleetId, parentFleetId, streamaxFleetId, parentStreamaxFleetId } = req.group;

      const name = groupName.replace(/[^\w\s]/g, ''); // Elimina caracteres especiales de la cadena.

      await updateFleet(name, parentStreamaxFleetId, streamaxFleetId);
      const data = await dbService.groupManagement(action, req.sessionid.sessionid, fleetId, name, parentFleetId, null, null, name != groupName ? groupName : null);
      res.status(200).json({
        status: true,
        message: '',
        data: { fleetId: data }
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }

  deleteGroup = async (req, res) => {
    try {
      const {action, fleetId, parentFleetId, streamaxFleetId} = req.group;

      const ftData = await deleteFleet(streamaxFleetId);
      const data = await dbService.groupManagement(action, req.sessionid.sessionid, fleetId, null, parentFleetId, null, null, null)

      res.status(200).json({
        status: true,
        message: '',
        data: null
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || error,
        data: null
      });
    }
  }
}

module.exports = new GroupController();