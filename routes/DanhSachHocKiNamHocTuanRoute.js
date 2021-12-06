const router = require("express").Router();
const jwtAuth = require("../middlewares/JwtAuth");
const DanhSachHocKiNamHocTuanController = require("../controllers/DanhSachHocKiNamHocTuanController");
const DanhSachHocKiNamHocTuanValidator = require("../validators/DanhSachHocKiNamHocTuanValidator");

router.get(
  "/get-danhsachhockinamhoctuan",
  jwtAuth,
  DanhSachHocKiNamHocTuanValidator.getListHocKiNamHocTuanValidation,
  DanhSachHocKiNamHocTuanValidator.result,
  DanhSachHocKiNamHocTuanController.getListHocKiNamHocTuan
);

module.exports = router;
