const router = require("express").Router();
const jwtAuth = require("../middlewares/JwtAuth");
const LichHocController = require("../controllers/LichHocController");
const LichHocValidator = require("../validators/LichHocValidator");

router.get(
  "/get-lichhoc",
  jwtAuth,
  LichHocValidator.getLichHocValidation,
  LichHocValidator.result,
  LichHocController.getLichHoc
);

module.exports = router;
