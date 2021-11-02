const SinhVienController = require("../controllers/SinhVienController");
const SinhVienValidator = require("../validators/SinhVienValidator");
const router = require("express").Router();
const basicAuth = require("../middlewares/BasicAuth");

router.post(
  "/create-sv",
  basicAuth,
  SinhVienValidator.registerSinhVienValidation,
  SinhVienValidator.result,
  SinhVienController.registerSinhVienAccount
);

module.exports = router;
