const handleResponseUtil = require('../utils/handleResponse.util');
const shortcutValidator = require('../validators/shortcut.validator');

class ShortcutMiddleware {
    addShorcut = async (req, res, next) => {
        try {
            req.shortcut = await shortcutValidator.addShortcut().validateAsync({...req.body});

            next ();
        } catch (error) {
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    }

    updateShortcut = async (req, res, next) => {
        try {
            req.shortcut = await shortcutValidator.updateShortcut().validateAsync({...req.body});

            next ();
        } catch (error) {
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    }

    deleteShortcut = async (req, res, next) => {
        try {
            req.shortcut = await shortcutValidator.deleteShortcut().validateAsync({...req.body});

            next ();
        } catch (error) {
            handleResponseUtil(res, 400, false, error.message || error, null);
        }
    }
}

module.exports = new ShortcutMiddleware();