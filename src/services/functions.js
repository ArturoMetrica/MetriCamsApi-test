const axios = require('axios');
const https = require('https');
const Database = require('./database');
const db = new new Database();

const agent = new https.Agent({
    rejectUnauthorized: false
});
const config = {
    headers: {
        'Content-Type':'application/json'
    },
    httpsAgent: agent
};

class FunctionService {
    async Login(params){
        return await db.getLoginData(params);
    }
    
}

module.exports = FunctionService;

/********************* Propiedad de Métrica Móvil SA de CV **************************/