const http = require("http"),
    Layer = require("express/lib/router/layer"),
    debug = require("debug")("app:extensions:response-handler"),
    { ResponseError, MailError } = require("../errors");

Layer.prototype.handle_request = async function(req, res, next) {
    const fn = this.handle;
    if (fn.length > 3) {
        return next();
    }
    try {
        const newResponse = await fn(req, res, next);
        if (
            typeof newResponse !== "undefined" &&
            !(newResponse instanceof http.ServerResponse)
        ) {
            res.send(newResponse);
        }
    } catch (err) {
        if (req.headers.accept !== "application/json") {
            return next(err);
        }
        // When throws Response error.
        if (err instanceof ResponseError) {
            return res.status(err.code || 500).send({ message: err.message });
        }
        debug(err);
        return res
            .status(500)
            .send({ message: err.message, stack: err.stack.split("\n") });
    }
};
