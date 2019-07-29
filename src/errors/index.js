class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

class ResponseError extends AppError {}

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
