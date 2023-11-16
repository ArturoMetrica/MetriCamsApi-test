const { Pool } = require('pg');
const { db } = require('./env');

const pool = new Pool(db); 

const query = async (text, params) => {
  const client = await pool.connect();

  try {
    const result = await client.query(text, params);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const getData = async (query, values) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, values);

    return {
      status: true,
      message: null,
      data: res.rows
    };
  } catch (error) {
    switch (error.message) {
      case '01':
        return { status: false, message: 'No existe una sesión para éste usuario', code: '01' };
      case '02':
        return { status: false, message: 'La sesión actual del usuario no se encuentra activa', code: '02' };
      case '03':
        return {
          status: false,
          message: 'La sesión actual ya ha expirado, necesita iniciar sesión para generar una nueva',
          code: '03'
        };
      default:
        return { status: false, message: error.message, data: null };
    }
  }
  finally {
    client.release();
  }
}

const testConnection = async () => {
  try {
    const result = await query('SELECT NOW() AS data');

    console.info(`DATABASE CONNECTED: ${result[0].data.toISOString()}`);
  } catch (error) {
    console.error('DATABASE CONNECTION ERROR:', error);
    process.exit(1);
  }
};

module.exports = {
  query,
  getData,
  testConnection
};