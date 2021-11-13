const SinhVienController = require("../controllers/SinhVienController");
const SinhVienValidator = require("../validators/SinhVienValidator");
const router = require("express").Router();
const basicAuth = require("../middlewares/BasicAuth");
const jwtAuth = require("../middlewares/JwtAuth");

router.post(
  "/create-sv",
  basicAuth,
  SinhVienValidator.registerSinhVienValidation,
  SinhVienValidator.result,
  SinhVienController.registerSinhVienAccount
);

router.get(
  "/get-info",
  jwtAuth,
  SinhVienValidator.getInfoSinhVienValidation,
  SinhVienValidator.result,
  SinhVienController.getInfoSinhVien
);

module.exports = router;
