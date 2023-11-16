const app = require("./config/server");
const { testConnection } = require('./config/database');

const { server: { port, timeout } } = require('./config/env');

app.listen(port, () => console.log(`Server is now actively listening on port: ${port}.`)).setTimeout(timeout);
testConnection();