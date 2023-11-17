// Retornar mensaje de éxito
const sendMsg = ({ status = true, message = 'Datos obtenidos con éxito', data = null }) => ({ status, message, data });

// Retornar mensaje de error
const sendErr = (e) => ({ status: false, message: e.message || e, data: e.data || null });

module.exports = { sendMsg, sendErr };
