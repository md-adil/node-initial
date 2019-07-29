const { Router } = require("express"),
    controller = require("../controllers"),
    homeController = controller("homeController");

const app = Router();
app.get("/", homeController.index);
module.exports = app;
