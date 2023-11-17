const axios = require('axios')
const https = require('https')
const moment = require('moment')
const DBService = require('../services/database')

const config = require('../config/env').videoLink
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const database = new DBService()

class EvidenceCenter {
	calculateFromDateAndToDate(dateTime) {
		const utc = moment.utc
		const fromDate = utc(dateTime).subtract(30, 'seconds').format(dateFormat)
		const toDate = utc(dateTime).add(30, 'seconds').format(dateFormat)
		return { fromDate, toDate }
	}

	async getEvidenceCenterList(dateTime, serial, type) {
		const { fromDate, toDate } = this.calculateFromDateAndToDate(dateTime)
		const { data } = await axios.post(
			`${config.evidenceCenterList}`,
			{
				key: config.key,
				terid: [serial],
				starttime: fromDate,
				endtime: toDate,
				alarmtype: type,
				keytype: -1,
				keyword: '',
				page: 1,
				count: 100,
			},
			{
				httpsAgent: new https.Agent({
					rejectUnauthorized: false,
				}),
			}
		)
		const closer = this.findCloserEventAsArray(data.data)
		return closer
	}

	findCloserEventAsArray(events, eventTime) {
		let diffActual = Number.MAX_SAFE_INTEGER
		const closerEvent = events.reduce((closer, evt) => {
			const diffEvt = this.absTimeDiff(evt.time || 0, eventTime)
			if (diffActual <= diffEvt) return closer

			diffActual = diffEvt
			return evt
		}, {})
		return [closerEvent.eid]
	}

	absTimeDiff(time1, time2) {
		return Math.abs(moment.utc(time1).diff(moment.utc(time2), 'milliseconds'))
	}

	reduceChannels(channelData) {
		return channelData.reduce(
			(acc, channel) => ({
				...acc,
				[channel.chl]: channel.name,
			}),
			{}
		)
	}

	async getChannels() {
		const channels = await database.getChannel({})
		return channels.reduce(
			(acc, channel) => ({
				...acc,
				[channel.serial]: this.reduceChannels(channel.channels),
			}),
			{}
		)
	}

	async getPathsByEid(eid) {
		const { data } = await axios.post(
			`${config.evidenceCenterVideo}`,
			{
				key: config.key,
				eid,
			},
			{
				httpsAgent: new https.Agent({
					rejectUnauthorized: false,
				}),
			}
		)
		return data.data
	}

	async getEvidencePathList(eids, serial) {
		try {
			const channelsData = await this.getChannels()
			const deviceChannels = channelsData[serial]
			const promises = eids.map(async (eid) => {
				const data = await this.getPathsByEid(eid)
				const paths = []

				data.forEach((item) => {
					item.video.forEach((e) => {
						paths.push({
							path: this.makeLink(e.path),
							ch: item.channel,
							channel: deviceChannels[item.channel],
							start: e.starttime,
							end: e.endtime,
						})
					})
				})

				return { serial, paths }
			})

			const result = await Promise.all(promises)
			return result.reduce((acc, info) => {
				return [...acc, ...info.paths]
			}, [])
		} catch (error) {
			console.log(error)
		}
	}

	makeLink(path) {
		return `${config.directDownload}key=${config.key}&dir=${path}`
	}
}

module.exports = new EvidenceCenter()

/********************* Propiedad de Métrica Móvil SA de CV **************************/