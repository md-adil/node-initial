const Response = require("../http/response");
exports.index = req => {
    return "Welcome home";
};

exports.diffCode = req => {
    return new Response("hello world", 300);
}