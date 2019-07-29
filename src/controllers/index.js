const path = require("path");
module.exports = name => {
    return require(path.join(__dirname, name));
};
