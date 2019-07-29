const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);
const User = require("../models/User");
const { AuthError } = require("../errors");
const config = require("../config/app");
module.exports = () => async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        throw new AuthError(
            "Unauthorized request, Please provide authorization token"
        );
    }
    let payload;
    try {
        payload = await verify(token, config.key);
    } catch (err) {
        throw new AuthError("Authorization token is not valid");
    }
    user = await User.query().findById(payload.sub);
    if (!user) {
        throw new AuthError("Invalid credential");
    }
    req.user = user;
    next();
};
