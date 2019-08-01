const { ResponseError } = require("../errors");
const User = require("../models/User");

exports.index = async req => {
    if (!req.query.page) {
        throw new ResponseError(
            "Page is required" /** response error message */,
            422 /** Response error code */
        );
    }
    return User.query().page(parseInt(req.query.page) - 1, 25);
};
