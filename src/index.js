require("dotenv").config();
Promise = require("bluebird");
require("./extensions/response-handler");

const express = require("express"),
    config = require("./config"),
    debug = require("debug")("app:server"),
    { web, api } = require("./routes");

const app = express();

app.use(web);
app.use("/api", api);

require("./models/connection");
app.listen(config.app.port, config.app.host, () => {
    debug("> Server started http://%s:%s", config.app.host, config.app.port);
});
