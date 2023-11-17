const SimService = require('./sim.service')
const DBService = require('../services/database')
const dbService = new DBService()

class ChartService {
	async get(chart) {
		const result = await dbService.getAlarmGeotabStreamax(
			chart.sessionid,
			chart.rulesS.length > 0 ? chart.rulesS : null,
			chart.vehicles.length > 0 ? chart.vehicles : null,
			chart.startTime,
			chart.endTime,
			chart.statusP,
			chart.statusE,
			chart.rulesG.length > 0 ? chart.rulesG : null,
			chart.offSet
		);

		const data = result.geotab?result.geotab.concat(result.streamax || []): result.streamax.concat(result.geotab||[]);

		if (!data) return { status: true, message: null, data: [] }

		const dataGroupedByVehicle = this.groupDataByVehicle(data)

		const chartData = Object.keys(dataGroupedByVehicle)
			.map((idVehicle) => {
				const { sumsPerRuleId, vehicleTotal } = this.sumVehicleRules(
					dataGroupedByVehicle[idVehicle]
				)
				return {
					idVehicle: parseInt(idVehicle),
					data: Object.values(sumsPerRuleId),
					vehicleTotal,
				}
			})
			.sort((a, b) => b.vehicleTotal - a.vehicleTotal)
		return chartData
	}

	async simChart(chart) {
		try {
			if (!chart.phoneNumbers) chart = await this.getPhoneNumber(chart)
			return SimService.getDataUsageMultiplePhoneNumbers(chart.phoneNumbers)
		} catch (error) {
			console.log(new Date(), error.message)
			throw error
		}
	}

	async getPhoneNumber(chart) {
		let { sessionid, vehicleIds } = chart
		if (!vehicleIds || !vehicleIds.length) vehicleIds = []

		const [{ data }] = await this.getAllVehicles(sessionid)
		const vehicles = data.filter(
			(vehicle) =>
				vehicleIds.includes(vehicle.id) || this.validValue(vehicle.simNumber)
		)
		chart.phoneNumbers = vehicles.map((v) => ({
			phone: v.simNumber,
			idVehicle: v.id,
		}))
		return chart
	}

	validValue(val) {
		if (
			val === null ||
			val === '' ||
			val === false ||
			val === undefined ||
			val === 'undefined'
		)
			return false
		return true
	}

	async getAllVehicles(sessionid) {
		return dbService.getAllVehicles(sessionid)
	}

	sumVehicleRules(vehicle) {
		let vehicleTotal = 0
		const sumsPerRuleId = vehicle.reduce((acc, el) => {
			if (!acc[el.idRule]) {
				vehicleTotal++
				acc[el.idRule] = { idRule: el.idRule, value: 1 }
			} else {
				vehicleTotal++
				acc[el.idRule] = {
					idRule: el.idRule,
					value: acc[el.idRule].value + 1,
				}
			}
			return acc
		}, {})
		return { sumsPerRuleId, vehicleTotal }
	}

	groupDataByVehicle(data) {
		return data.reduce((acc, el) => {
			if (!acc[el.idVehicle]) acc[el.idVehicle] = [el]
			else acc[el.idVehicle] = [...acc[el.idVehicle], el]
			return acc
		}, {})
	}
}

module.exports = new ChartService()

/********************* Propiedad de Métrica Móvil SA de CV **************************/