const { query } = require('./dbconnection');

const shortcutStructure = async () => {
	try {
		return await query('SELECT * FROM shortcut_structure_select_fn() AS QUERY')
	} catch (error) {
		throw error;
	}
}

module.exports = {
	shortcutStructure
};