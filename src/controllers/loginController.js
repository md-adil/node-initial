const { ResponseError } = require("../errors");
exports.login = req => {
    return {
        token: "somejsontoken",
        user: {
            // user model
        }
    };
};
