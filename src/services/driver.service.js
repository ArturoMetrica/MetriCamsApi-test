const config = require('../config/env.js').driverFace
const DriverRepository = require('../repositories/driver.repository.js')
const DriverFaceService = require('./driverFace.service')
const DBService = require('../services/database')

const dbService = new DBService()

class DriverService {
	async get(driver) {
		const pathDictionary = await DriverFaceService.getFaceIndexDictionaryOfAllDrivers(
			driver
		)
		const drivers = await DriverRepository.get(driver)

		return drivers.map((driver) => ({
			...driver,
			faces: DriverFaceService.makeUrlsFromDriver(driver.faces, pathDictionary),
		}))
	}

	async getOne(driver) {
		const drivers = await this.get({
			sessionid: driver.sessionid,
			vehicles: [],
			groups: [],
		})
		return drivers.find(({ driverId }) => driverId === driver.id)
	}

	async create(driver) {
		try {
			const [vehicles, created, drivers] = await Promise.all([
				dbService.findVehicles(driver.sessionid, driver.vehicles),
				DriverRepository.create(driver),
				DriverFaceService.getAll(driver),
			])
			driver.ceibaDrivers = drivers

			const vehiclesMdvr = vehicles.map((v) => v.serialMDVR)
			const updatedFaces = await DriverFaceService.updateFaces(
				driver,
				vehiclesMdvr
			)
			return { ...created, updatedFaces }
		} catch (error) {
			console.log('create driver', error.message)
			throw { code: 400, message: error.message }
		}
	}

	async update(driver) {
		try {
			const [vehicles, prevDriver, drivers] = await Promise.all([
				dbService.findVehicles(driver.sessionid, driver.vehicles),
				this.getOne(driver),
				DriverFaceService.getAll(driver),
			])

			const removedFaces = this.findRemovedFaces(prevDriver, driver)

			driver.ceibaDrivers = drivers

			const vehiclesMdvr = vehicles.map((v) => v.serialMDVR)
			const updatedFaces = await DriverFaceService.updateFaces(
				driver,
				vehiclesMdvr
			)
			const deletedFaces = config.softDelete
				? await DriverFaceService.deleteFaces(
						removedFaces,
						driver,
						vehiclesMdvr,
						1
				  )
				: await DriverFaceService.deleteUsers(
						removedFaces,
						driver,
						vehiclesMdvr
				  )

			const updated = await DriverRepository.update(driver)

			return { ...updated, updatedFaces, deletedFaces }
		} catch (error) {
			console.log('update driver', error.message)
			throw error
		}
	}

	async updateCeibaFace(driver) {
		const drivers = await DriverFaceService.getAll(driver)
		driver.ceibaDrivers = drivers
		const updatedFace = await DriverFaceService.updateSingleFace(
			driver.face,
			null,
			driver,
			false
		)
		return updatedFace
	}

	async deleteCeibaFace(driver) {
		const drivers = await DriverFaceService.getAll(driver)
		driver.ceibaDrivers = drivers
		const removedFace = await DriverFaceService.deleteSingleUserByDriverNumber(
			driver.faceId,
			driver
		)

		return removedFace
	}

	findRemovedFaces(oldDriver, driver) {
		if (!oldDriver || !driver || !oldDriver.faces || !driver.faces) return []
		return oldDriver.faces.filter(({ path }) => {
			const exists = driver.faces.find((driverFace) => driverFace.path === path)
			return !exists
		})
	}

	async delete(driver) {
		try {
			const [vehicles, prevDriver, drivers] = await Promise.all([
				dbService.findVehicles(driver.sessionid, driver.vehicles),
				this.getOne(driver),
				DriverFaceService.getAll(driver),
			])

			const removedFaces = prevDriver.faces

			driver.ceibaDrivers = drivers

			const vehiclesMdvr = prevDriver.vehicles.map((e) => e.serialMDVR)

			const deletedFaces = config.softDelete
				? await DriverFaceService.deleteFaces(
						removedFaces,
						driver,
						vehiclesMdvr
				  )
				: await DriverFaceService.deleteUsers(
						removedFaces,
						driver,
						vehiclesMdvr
				  )

			const deleted = await DriverRepository.delete(driver)

			return { ...deleted, deletedFaces }
		} catch (error) {
			console.log('update driver', error.message)
			throw error
		}
	}
}

module.exports = new DriverService()

/********************* Propiedad de Métrica Móvil SA de CV **************************/