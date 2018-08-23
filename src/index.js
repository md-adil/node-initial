const express = require('express'),
    config = require('./config'),
    debug = require('debug')('app:server'),
    { web, api } = require('./routes');

const app = express();

app.use(web);
app.use('/api', api);



app.listen(config.app.port, () => {
    debug('Listening on port: %s', config.app.port);
});