const axios = require('axios')
const axiosRetry = require('axios-retry')
const https = require('https')

const DIRECTION_KEY = process.env.GPS_ADDRESS_API_KEY
axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay })

const agent = new https.Agent({
	rejectUnauthorized: false,
})
const config = {
	headers: {
		key: DIRECTION_KEY,
		'Content-Type': 'application/json',
	},
	httpsAgent: agent,
}

function replaceProps(arr, keyNames, _delete = false) {
	return arr.map((e) => {
		e.x = e[keyNames.x]
		e.y = e[keyNames.y]
		if (_delete) {
			delete e.x
			delete e.y
		}
		return e
	})
}

async function getAddresses(
	coordinates,
	credentials,
	keyNames = { x: 'lng', y: 'lat' }
) {
	try {
		if (!coordinates) return coordinates
		if (typeof coordinates === 'object' && !Array.isArray(coordinates)) {
			coordinates = [coordinates]
		}
		coordinates = replaceProps(coordinates, keyNames)
		const { data } = await axios.post(
			process.env.GPS_ADDRESS_API_BASE_URL,
			coordinates,
			{ ...config, token: credentials }
		)
		return replaceProps(data, keyNames, true)
	} catch (error) {
		console.log(
			new Date().toISOString(),
			error.message,
			'@address.service.getAddresses',
			error
		)
		return coordinates
	}
}

module.exports = { getAddresses }

/********************* Propiedad de Métrica Móvil SA de CV **************************/