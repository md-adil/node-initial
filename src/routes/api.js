const { Router } = require("express"),
    bodyParser = require('body-parser'),
    authMiddleware = require("../middlewares/authentication");
const controller = require("../controllers");

const userController = controller("userController"),
    loginController = controller("auth/loginController"),
    registerController = controller("auth/registerController");

const route = Router();
route.use(bodyParser.json());
route.post("/login", loginController.login);
route.post('/register', registerController.register);

route.use(authMiddleware());
route.get("/users", userController.index);

module.exports = route;
