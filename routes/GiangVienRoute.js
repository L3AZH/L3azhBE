const GiangVienValidator = require("../validators/GiangVienValidator");
const GiangVienController = require("../controllers/GiangVienController");
const router = require("express").Router();
const basicAuth = require("../middlewares/BasicAuth");

router.post(
  "/create-gv",
  basicAuth,
  GiangVienValidator.registerGiangVienValidation,
  GiangVienValidator.result,
  GiangVienController.registerGiangVienAccount
);

module.exports = router;
