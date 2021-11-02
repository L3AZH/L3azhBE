const AuthValidator = require("../validators/AuthValidator");
const AuthController = require("../controllers/AuthController");
const router = require("express").Router();
const basicAuth = require("../middlewares/BasicAuth");

router.post(
  "/login",
  basicAuth,
  AuthValidator.loginValidation,
  AuthValidator.result,
  AuthController.login
);

module.exports = router;
