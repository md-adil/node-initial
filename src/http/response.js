class Response {
    constructor(body, statusCode) {
        this.body = body;
        this.statusCode = statusCode || 200;
    }
}

module.exports = Response;