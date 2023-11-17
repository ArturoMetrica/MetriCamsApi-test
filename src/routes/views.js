const express = require('express');
const app = express();
const router = express.Router();
const DBService = require('../services/database');
const dbService = new DBService();


router.get('/systemfuncs', async(req, res) => {
    try {
        let data = await dbService.getSystemFunctions();
        res.send(data);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

app.use('/api', router);
module.exports = app;

/********************* Propiedad de Métrica Móvil SA de CV **************************/