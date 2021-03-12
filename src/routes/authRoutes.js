let express = require("express");
let router = express.Router();

const AuthController = require("../controllers/AuthController");
const inputValidate = require("../middlewares/InputValidateMiddleware/authenticate");

const authController = AuthController();

router.post("/auth", inputValidate, authController.authenticate);

module.exports = router;
