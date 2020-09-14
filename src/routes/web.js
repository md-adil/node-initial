const { Router } = require("express"),
    controller = require("../controllers"),
    homeController = controller("homeController");

const app = Router();
app.get("/", homeController.index);
app.get("/different-code", homeController.diffCode);
module.exports = app;