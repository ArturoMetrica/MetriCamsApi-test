const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const useragent = require('express-useragent');

const { server } = require('./env');
const router = require('../routes/router');

const app = express();

app.use(express.json({ limit: server.limit }));
app.use(express.urlencoded({ extended: server.extended }));
app.use(useragent.express());
app.use(helmet());
app.use(morgan(server.environment == 'dev' ? 'dev' : 'combined'));
app.use(cors({
  origin: server.corsAllowed,
  optionsSuccessStatus: server.optionsSuccessStatus
}));
// app.use('/api', router);
app.use(router);

module.exports = app;