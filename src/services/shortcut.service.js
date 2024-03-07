const { query } = require('./dbconnection');

const addShortcut = async (sessionId, params) => {
	try {
		const result = await query('SELECT * FROM insert_new_shortcut_fn($1,$2) AS QUERY', [
			sessionId,
			params ? JSON.stringify(params) : '[]'
		]);
		if (result[0] && result[0].query) return result[0].query;
	} catch (error) {
		throw error;
	}
}

const updateShortcut = async (sessionId, data) => {
	try {
		const result = await query('SELECT * FROM update_shortcut_fn($1,$2) AS QUERY', [
			sessionId,
			data ? JSON.stringify(data) : '[]'
		]);
		if (result[0] && result[0].query) return result[0].query;
	} catch (error) {
		throw error;
	}
}

const deleteShortcut = async (sessionId, data) => {
	try {
		const result = await query('SELECT * FROM delete_shortcut_fn($1,$2) AS QUERY', [
			sessionId,
			data ? JSON.stringify(data) : '[]'
		]);
		if (result[0] && result[0].query) return result[0].query;
	} catch (error) {
		throw error;
	}
}

const getShortcut = async (sessionId) => {
	try {
		const result = await query('SELECT * FROM get_shortcut_fn($1) AS QUERY', [sessionId]);
		if (result[0] && result[0].query) return result[0].query;
	} catch (error) {
		throw error;
	}
}

const getShortcutFlags = async () => {
	try {
		const result = await query('SELECT * FROM get_shortcut_flag_fn() AS QUERY');
		if (result[0] && result[0].query) return result[0].query;
	} catch (error) {
		throw error;
	}
}

const shortcutStructure = async () => {
	try {
		return await query('SELECT * FROM shortcut_structure_select_fn() AS QUERY')
	} catch (error) {
		throw error;
	}
}

module.exports = {
	addShortcut,
	updateShortcut,
	deleteShortcut,
	getShortcut,
	getShortcutFlags,
	shortcutStructure
};