const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/AuthMiddleware");
const inputValidate = require("../middlewares/InputValidateMiddleware/user");

const UserController = require("../controllers/UserController");

const userController = UserController();

router.post("/users", inputValidate, userController.store);

router.get("/users", [authMiddleware, inputValidate], userController.index);
router.get("/users/:id", [authMiddleware, inputValidate], userController.show);
router.put(
  "/users/:id",
  [authMiddleware, inputValidate],
  userController.update
);
router.delete(
  "/users/:id",
  [authMiddleware, inputValidate],
  userController.delete
);

module.exports = router;
