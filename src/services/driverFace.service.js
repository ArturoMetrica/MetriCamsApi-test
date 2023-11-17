const axios = require('axios').default
const { nanoid } = require('nanoid/async')
const config = require('../config').driverFace
const CodeGroupService = require('./codeGroup.service')

class DriverFace {
	constructor() {
		this.jobStatus = { all: -1, resign: 0, current: 1 }
		this.checkStatus = { all: -1, noUpdated: 0, pending: 1, approved: 2 }
		this.checkStatusVal = {
			0: 'Not Uploaded',
			1: 'Pending review',
			2: 'Verification passes',
		}
		this.type = { all: -1, card: 0, face: 1 }
		this.matchTypes = { nameOrNumber: 2, name: 0, Disabled: -1 }
	}

	getHash() {
		return nanoid(4)
	}

	filterFacesWithCodeGroups(face, codeGroups) {
		if (!codeGroups || !Array.isArray(codeGroups) || !codeGroups.length)
			return []

		const codeGroupsStringArray = codeGroups.map((cg) =>
			cg.code ? cg.code : '----'
		)
		const faceCodeGroup = (face.number ? face.number : face.identity)
			.substring(0, config.codeGroupLengthFiltering)
			.replace(/[0-9]*/g, '')

		return (
			codeGroupsStringArray.find((code) => faceCodeGroup.indexOf(code) >= 0) ||
			codeGroupsStringArray.find((code) => faceCodeGroup.indexOf(code) >= 0)
		)
	}

	async getAll(driver) {
		const filters = this.mapFilters()
		const groupCodesAvailable = await CodeGroupService.get(driver)

		const {
			data: { data },
		} = await axios.post(config.url, filters)
		const filtered = data.filter(
			(d) =>
				d.faceindex &&
				d.faceindex.length > 0 &&
				this.filterFacesWithCodeGroups(d, groupCodesAvailable)
		)
		return this.mapResponse(filtered)
	}

	async getFaceIndexDictionaryOfAllDrivers(driver) {
		const all = await this.getAll(driver)
		const dict = all.reduce(
			(acc, el) => ({
				...acc,
				[el.faceindex && el.faceindex.length ? el.faceindex[0] : '-']: el,
			}),
			{}
		)
		return dict
	}

	mapResponse(response) {
		if (typeof response !== 'object' && !Array.isArray(response)) {
			return []
		}
		return response.map((driverInfo) => ({
			...driverInfo,
			imageUrls: this.makeUrls(driverInfo.faceindex),
		}))
	}

	makeUrls(faceindexArr) {
		if (!faceindexArr || !faceindexArr.length) return []
		return faceindexArr.map(
			(faceindex) =>
				`${config.directDownload}key=${config.key}&dir=${faceindex}`
		)
	}

	makeUrlsFromDriver(faces, ceibaDrivers) {
		if (!faces || !faces.length) return []
		return faces.map((face) => ({
			...face,
			imageUrl: `${config.directDownload}key=${config.key}&dir=${face.path}`,
			...this.addStatusToFaces(face, ceibaDrivers),
		}))
	}

	addStatusToFaces(face, ceibaDrivers) {
		const ceibaDriver = ceibaDrivers[face.path]
		const currentStatus = ceibaDriver
			? (ceibaDriver && ceibaDriver.checkstatus) || 0
			: 0
		return {
			status: this.checkStatusVal[currentStatus],
			checkStatus: currentStatus,
		}
	}

	mapFilters(driver) {
		return {
			key: config.key,
			jobstatus: driver ? this.jobStatus[driver.jobStatus] : -1,
			checkstatus: driver ? this.checkStatus[driver.checkStatus] : -1,
			type: driver ? this.type[driver.type] : -1,
			matchtype: driver ?
				driver.name || driver.employeeNumber || driver.find
					? this.matchTypes.nameOrNumber
					: this.matchTypes.Disabled : this.matchTypes.Disabled,
			keyword: driver ? driver.name || driver.employeeNumber || driver.find || '' : '',
			page: driver ? driver.page : -1,
			count: driver ? driver.count : -1,
		}
	}

	async updateFaces(driver, vehicles) {
		if (!driver.faces || !driver.faces.length) return []
		const queries = driver.faces.map((face) =>
			this.updateSingleFace(face, vehicles, driver)
		)
		const driverNumbers = await Promise.all(queries)
		const sendedFacesResult = await this.sendFacesToDevices(
			driverNumbers,
			vehicles
		)
		return sendedFacesResult
	}

	async updateSingleFace(
		{ faceId, path },
		vehicles,
		driver,
		checkStatus = 2,
		jobStatus = 1,
		reset = true
	) {
		let uniqueFaceId = faceId

		if (reset) {
			const hash = await this.getHash()
			uniqueFaceId = faceId + hash
		}
		const oldDriver = this.getOldDriverByPath(driver.ceibaDrivers, path)

		if (!oldDriver) return false

		const res = await axios.post(config.updateNormal, {
			key: config.key,
			name: this.getNameForUpdateSingleFace(jobStatus, driver, oldDriver),
			oldname: oldDriver.name,
			number: uniqueFaceId || driver.employeeNumber,
			oldnumber: oldDriver.number,
			checkstatus: driver.checkStatus || checkStatus,
			jobstatus: jobStatus,
			identity: uniqueFaceId || driver.employeeNumber,
			terid: vehicles || oldDriver.vehicles || undefined,
			license: driver.license || oldDriver.license,
			phone: driver.phone || oldDriver.phone,
			email: driver.email || oldDriver.email,
		})
		return uniqueFaceId
	}

	getNameForUpdateSingleFace(jobStatus, driver, oldDriver) {
		if (jobStatus === 0) return 'Deleted'
		if (driver.name) return driver.name + ' ' + driver.lastName
		return oldDriver.name
	}

	getOldDriverByPath(drivers, path) {
		return drivers.find(
			(d) => d.faceindex && d.faceindex.length && d.faceindex.includes(path)
		)
	}

	getOldDriverByDriverNumber(drivers, driverNumber) {
		return drivers.find((d) => d.number === driverNumber)
	}

	async deleteFaces(faces, driver, vehiclesMdvr, jobStatus = 0, reset = true) {
		const promises = faces.map((face) =>
			this.updateSingleFace(face, [''], driver, 1, jobStatus, reset)
		)

		const driverNumbers = await Promise.all(promises)
		if (driverNumbers && driverNumbers.length)
			return this.removeFacesFromRemoteDevices(driverNumbers, vehiclesMdvr)
		return driverNumbers
	}

	async deleteUsers(faces, driver) {
		const promises = faces.map((face) => this.deleteSingleUser(face, driver))
		const driverNumbers = await Promise.all(promises)
		if (driverNumbers && driverNumbers.length)
			return this.removeFacesFromRemoteDevices(driverNumbers, vehiclesMdvr)
		return driverNumbers
	}

	async deleteSingleUser({ faceId, path }, driver) {
		const oldDriver = this.getOldDriverByPath(driver.ceibaDrivers, path)

		const { data } = await axios.post(config.deleteUrl, {
			key: config.key,
			isapi: 1,
			optuser: 1,
			driver: [
				{
					driverid: oldDriver.driverid,
					drivername: oldDriver.name,
					drivernumber: oldDriver.number,
				},
			],
		})

		return oldDriver.number
	}

	async deleteSingleUserByDriverNumber(driverNumber, driver) {
		const oldDriver = this.getOldDriverByDriverNumber(
			driver.ceibaDrivers,
			driverNumber
		)
		if (
			!oldDriver ||
			!oldDriver.number ||
			!oldDriver.faceindex ||
			!Array.isArray(oldDriver.faceindex) ||
			!oldDriver.faceindex.length
		)
			throw { code: 500, message: 'The driver has incorrect info' }

		const res = await this.deleteFaces(
			[{ faceId: oldDriver.number, path: oldDriver.faceindex[0] }],
			driver,
			oldDriver.terid,
			0,
			false
		)
		return res
	}

	async sendFacesToDevices(driverNumbers, vehiclesMdvr) {
		if (
			!driverNumbers ||
			!vehiclesMdvr ||
			!Array.isArray(driverNumbers) ||
			!Array.isArray(vehiclesMdvr)
		)
			throw { code: 400, message: 'Invalid driver or vehicle information' }

		const { data } = await axios.post(config.sendFacesUrl, {
			key: config.key,
			terid: vehiclesMdvr,
			drivernumber: driverNumbers,
			optuser: 1,
		})

		return data
	}

	async removeFacesFromRemoteDevices(driverNumbers, vehiclesMdvr) {
		if (
			!driverNumbers ||
			!vehiclesMdvr ||
			!Array.isArray(driverNumbers) ||
			!Array.isArray(vehiclesMdvr)
		)
			throw { code: 400, message: 'Invalid driver or vehicle information' }

		const promises = vehiclesMdvr.map((vehicleMdvr) =>
			this.removeFacesFromSingleRemoteDevice(driverNumbers, vehicleMdvr)
		)
		const results = await Promise.all(promises)
		return results
	}

	async removeFacesFromSingleRemoteDevice(driverNumbers, vehicleMdvr) {
		if (typeof vehicleMdvr !== 'string')
			throw { code: 400, message: 'Invalid vehicle info' }

		const { data } = await axios.post(config.removeRemoteFacesUrl, {
			key: config.key,
			optuser: 2,
			drivernumber: driverNumbers,
			terid: vehicleMdvr,
		})
		return data
	}
}

module.exports = new DriverFace()

/********************* Propiedad de Métrica Móvil SA de CV **************************/