const axios = require('axios').default;
const axiosRetry = require('axios-retry');

const { surfsight } = require('../config/env');

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const headers = {
	maxContentLength: Infinity,
	maxBodyLength: Infinity,
	timeout: 600000
}

class SurfsightService {
	async login() {
		try {
			const { data: { data } } = await axios.post(surfsight.baseURL + surfsight.login, {
				'email': surfsight.credentials.email, 'password': surfsight.credentials.password
			});

			return data ? data.token : null;
		} catch (error) {
			return null;
		}
	}

	async addMultipleDevices(token, orgId, devicesArray) {
		try {
			const { data } = await axios.post(surfsight.baseURL + `/organizations/${orgId}/bulk-devices`, devicesArray, {
				headers: { "Authorization": `Bearer ${token}` }
			});

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async addDevice(token, orgId, name, imei, groupId) {
		try {
			const { data } = await axios.post(surfsight.baseURL + `/organizations/${orgId}/devices`, {
				name, imei, groupId
			}, {
				headers: { "Authorization": `Bearer ${token}` }
			});

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async getActiveCameras(token, imei) {
		try {
			const data = await axios.get(surfsight.baseURL + `/devices/${imei}/cameras`, {
				headers: { "Authorization": `Bearer ${token}` }
			});

			return data ? data : null;
		} catch (error) {
			return error;
		}
	}

	async deviceDataUsage(token, imei) {
		try {
			const { data } = await axios.get(surfsight.baseURL + `/devices/${imei}/data-usage`, {
				headers: { "Authorization": `Bearer ${token}` }
			})

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async devicesDataUsage(token, imeis) {
		try {
			const { data } = await axios.post(surfsight.baseURL + surfsight.devicesDataUsage, {
				imeis
			}, {
				headers: { "Authorization": `Bearer ${token}` }
			});

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async cameraSnapshot(token, imei, cameraId, time) {
		try {
			const { data } = await axios.get(surfsight.baseURL + `/devices/${imei}/cameras/${cameraId}/snapshot`, {
				params: { time }, headers: { "Authorization": `Bearer ${token}` }
			});

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async connectMedia(token, imei) {
		try {
			const { data } = await axios.post(surfsight.baseURL + `/devices/${imei}/connect-media`, {}, {
				headers: { "Authorization": `Bearer ${token}` }
			});

			return data ? data : null;
		} catch (error) {
			throw error;
		}
	}

	async selectRecording(token, imei, start, end) {
		try {
			const { data } = await axios.get(surfsight.baseURL + `/devices/${imei}/recording-ranges`, {
				headers: { "Authorization": `Bearer ${token}` }, params: { start, end }
			});

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async getListOfAvaiableEventsMediaFiles(token, imei, start, end) {
		try {
			const { data } = await axios.get(surfsight.baseURL + `/devices/${imei}/events`, {
				headers: { "Authorization": `Bearer ${token}` }, params: { start, end }
			});

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async downloadEvent(token, imei, fileId, cameraId, fileType) {
		try {
			const { data } = await axios.get(surfsight.baseURL + `/devices/${imei}/event-file-link`, {
				headers: { "Authorization": `Bearer ${token}` }, params: { fileId, cameraId, fileType }
			});

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async createVirtualEvent(token, imei, time, mediaType, durationSeconds, quality, cameraId, metadata) {
		try {
			const { data } = await axios.post(surfsight.baseURL + `/devices/${imei}/virtual-event`, {
				time,
				mediaType,
				durationSeconds,
				quality,
				cameraId,
				metadata
			},
				{
					headers: { "Authorization": `Bearer ${token}` }
				});

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async getEventDetails(token, imei, start, end) {
		try {
			const { data } = await axios.get(surfsight.baseURL + `/devices/${imei}/events`, {
				headers: { "Authorization": `Bearer ${token}` }, params: { start, end }
			});

			return data ? data : null;
		} catch (error) {
			return null;
		}
	}

	async recordingsAvailability({ token, imei, start, end }) {
		try {
			const query = new URLSearchParams({
				start,
				end,
			}).toString();

			const { data } = await axios.get(surfsight.baseURL + `/devices/${imei}/recording-ranges?${query}`, {
				headers: { "Authorization": `Bearer ${token}` }
			});

			return data ? data.data : null
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new SurfsightService();