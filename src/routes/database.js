const { Pool } = require('pg');
const pgPool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASS,
    max: process.env.MAX,
    port: process.env.DBPORT,
});

pgPool.on('error', (error, client) => {
    console.log('OCURRIÓ UN ERROR AL ENVIAR O RECIBIR LA INFORMACIÓN \n' + error.message());
    client.release();
});

pgPool.connect((error, client, done) => {
    if(error) console.log(new Date().toISOString(), error); 
    console.log(new Date().toISOString(), 'SE HA CONECTADO A LA BASE DE DATOS');
});

async function getData(query, values) {
    let res = null;
    try {
        const pgClient = await pgPool.connect();
        if(values === null) res = await pgClient.query(query.toString());
        else res = await pgClient.query(query.toString(), values);
        pgClient.release();
        return {
            status: true,
            message: null,
            data: res.rows
        }
    } catch (error) {
        return {
            status: false,
            message: error.message, 
            data: null
        }
    }
}

/********************* Propiedad de Métrica Móvil SA de CV **************************/