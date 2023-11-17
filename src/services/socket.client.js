const io = require('socket.io-client')
const axios = require('axios')
const { getAddresses } = require('./address.service')

let socket = null
const dictionary = {
	gps: 'sub_gps',
	state: 'sub_state',
}
let lastEvent = new Date()

class SocketClient {
	constructor(socketServer, credentials) {
		this.socket = null
		this.dictionary = {
			gps: 'sub_gps',
			state: 'sub_state',
		}
		this.credentials = Buffer.from(JSON.stringify(credentials)).toString(
			'base64'
		)
		this.socketServer = socketServer
		this.lastMinute = null
		this.totalIncome = 0
		this.msInAMinute = 60000
	}

	connectSocket() {
		this.socket = io.connect(process.env.CEIBA_SOCKET_URL, {
			rejectUnauthorized: false,
		})
	}

	async subscribe() {
		const devices = []
		this.connectSocket()

		this.socket.emit(dictionary.gps, {
			key: process.env.KEY,
			didArray: devices,
		})
		this.socket.emit(dictionary.state, {
			key: process.env.KEY,
			didArray: devices,
		})
	}

	async start() {
		this.subscribe()

		this.socket.on('connect', () => {
			console.log(new Date().toISOString(), 'conectado al socket', this.socket.connected, this.socket.id)
		})

		this.socket.on('disconnect', () => {
			console.log(new Date().toISOString(), 'Streamax socket conection lost')
			this.socketServer.disconnect()
		})

		this.socket.on(dictionary.gps, async (data) => {

			this.socketServer.emit('gps', data[0])
		})

		this.socket.on(dictionary.state, (data) => {
			this.socketServer.emit('state', data)
		})
	}

	countIncome() {
		this.totalIncome = this.totalIncome + 1
		if (!this.lastMinute) this.lastMinute = new Date().getTime()
		else if (this.hasPassedOneMinute(this.lastMinute)) {
			this.lastMinute = new Date().getTime()
			console.log('Total Incoming within a minute: ', this.totalIncome)
			this.totalIncome = 0
		}
	}

	hasPassedOneMinute(current) {
		const now = new Date().getTime()
		if (now - current >= this.msInAMinute) return true
		return false
	}
}

module.exports = SocketClient

/********************* Propiedad de Métrica Móvil SA de CV **************************/