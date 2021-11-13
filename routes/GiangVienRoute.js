const GiangVienValidator = require("../validators/GiangVienValidator");
const GiangVienController = require("../controllers/GiangVienController");
const router = require("express").Router();
const basicAuth = require("../middlewares/BasicAuth");
const jwtAuth = require("../middlewares/JwtAuth");

router.post(
  "/create-gv",
  basicAuth,
  GiangVienValidator.registerGiangVienValidation,
  GiangVienValidator.result,
  GiangVienController.registerGiangVienAccount
);

router.get(
  "/get-info",
  jwtAuth,
  GiangVienValidator.getInfoGiangVienValidation,
  GiangVienValidator.result,
  GiangVienController.getInfoGiangVien
);

module.exports = router;
