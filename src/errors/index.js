class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

class ResponseError extends AppError {
    constructor(message, statusCode = 500) {
        super(message, 'RESPONSE_ERROR');
        this.statusCode = statusCode;
    }
    handle( req, res ) {
        if (req.headers.accept === "application/json") {
            return res.status(this.statusCode).send({ message: this.message });
        }
        return res.status(this.statusCode).send(this.message);
    }
}

class ValidationError extends ResponseError {
    constructor(message) {
        super(message, 422);
        this.code = 'VALIDATION_ERROR';
    }
}

class ResponseWarning extends AppError {}

class MailError extends AppError {}

class AuthError extends ResponseError {
    constructor(message) {
        super(message, 401);
    }
}

exports.AppError = AppError;
exports.ResponseError = ResponseError;
exports.AuthError = AuthError;
exports.MailError = MailError;
exports.ValidationError = ValidationError;