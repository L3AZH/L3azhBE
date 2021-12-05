const router = require("express").Router();
const basicAuth = require("../middlewares/BasicAuth");
const jwtAuth = require("../middlewares/JwtAuth");
const ToKhaiController = require("../controllers/ToKhaiController");
const ToKhaiValidator = require("../validators/ToKhaiValidator");

router.get(
  "/get-to-khai",
  jwtAuth,
  ToKhaiValidator.getListHealthDeclarationValidation,
  ToKhaiValidator.result,
  ToKhaiController.getListHealthDeclaration
);

router.post(
  "/create-to-khai",
  jwtAuth,
  ToKhaiValidator.createNewHealthDeclarationValidation,
  ToKhaiValidator.result,
  ToKhaiController.createNewHealthDeclaration
);

module.exports = router;
