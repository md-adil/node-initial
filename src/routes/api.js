const { Router } = require("express"),
    authMiddleware = require("../middlewares/authentication");
const controller = require("../controllers");

const userController = controller("userController"),
    loginController = controller("loginController");

const router = Router();
router.post("/login", loginController.login);

// router.use(authMiddleware());
router.get("/users", userController.index);

module.exports = router;
