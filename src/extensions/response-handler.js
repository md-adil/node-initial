const http = require("http"),
    Layer = require("express/lib/router/layer"),
    debug = require("debug")("app:extensions:response-handler"),
    Response = require("../http/response"),
    { ResponseError } = require("../errors");

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
            if (newResponse instanceof Response) {
                res.status(newResponse.statusCode).send(newResponse.body);
            } else {
                res.send(newResponse);
            }
        }
    } catch (err) {
        // When throws Response error.
        if (err instanceof ResponseError) {
            return err.handle(req, res);
        }

        if (req.headers.accept !== "application/json") {
            return next(err);
        }

        debug(err);
        return res
            .status(500)
            .send({ message: err.message, stack: err.stack.split("\n") });
    }
};