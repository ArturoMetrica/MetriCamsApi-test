const cron = require('node-cron');
const DBService = require('../services/database');
const dbService = new DBService();
const SocketClient = require('./socket.client');

class SocketServer {
  constructor() {
    this.totalConnections = 0;
    this.socketUsers = [];
  }

  create(server, app) {
    this.sio = require('socket.io')(server, {
      path: '/socket'
    });
    this.totalConnections = 0;
    app.set('socketUsers', [])

    const checkVideoUsers = cron.schedule("* * * * *", async () => {
      checkVideoUsers.stop();
      await this.checkVideoUsersTask(app);
      checkVideoUsers.start();
    });

    this.sio.on('connection', (_socket) => {
      _socket.on('auth', async (data) => {
        await this.auth(data, _socket);
        this.addTotalConnections(1);
        this.socketUsers.push({ user: data.username, id: _socket.id });
        app.set('socketUsers', this.socketUsers);
      });

      _socket.on('disconnect', () => {
        this.socketUsers = app.get('socketUsers').filter(e => e.id !== _socket.id);
        app.set('socketUsers', this.socketUsers);
        this.addTotalConnections(-1)
      });
    });
  }

  addTotalConnections(value) {
    const prevVal = this.totalConnections;
    this.totalConnections = Math.max(0, prevVal + value);
    console.log(new Date().toISOString(), 'Clientes conectados ', this.totalConnections);
  }

  async auth(data, _socket) {
    try {
      await this.validate(data);
      _socket.emit('auth', data);

      const socketClient = new SocketClient(_socket, data);
      await socketClient.start();
    } catch (error) {
      _socket.emit('auth', { error: error.message, data });
      _socket.disconnect(true);
    }
  }

  async validate(data) {
    if (!data || !data.session || !data.sessionId || !data.username || !data.database || !data.server)
      throw new Error('Invalid credentials');

    const res = await dbService.checkValidToken({
      sessionid: data.session
    });

  }

  emit(name, data) {
    if (this.sio) {
      this.sio.emit(name, data);
    }
  }

  async checkVideoUsersTask(app) {
    const { data } = await dbService.getCameraAccess();
    const socketUsers = app.get('socketUsers');
    if (socketUsers.length > 0) {
      const idxSMdvr = socketUsers.reduce((a, b) => ({ ...a, [b.user]: [...(a[b.user] || []), b], }), {}) || [];

      const deleteSerials = data.map(e => {
        const iSMdvr = idxSMdvr[e.mail];
        return !iSMdvr ? {
          mail: e.mail,
          serialMdvr: e.serialMdvr,
          chnl: e.chnl
        } : null;
      }).filter(e => e != null);

      if (deleteSerials.length > 0) {
        await dbService.deleteCameraAccess(deleteSerials);
      }
    } else if (data) {
      const deleteSerials = data.map(e => ({
        mail: e.mail,
        serialMdvr: e.serialMdvr,
        chnl: e.chnl
      }));
      await dbService.deleteCameraAccess(deleteSerials);
    }
  }
}

module.exports = new SocketServer();

/********************* Propiedad de Métrica Móvil SA de CV **************************/