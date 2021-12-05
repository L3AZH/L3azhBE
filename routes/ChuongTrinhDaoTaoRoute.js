const router = require("express").Router();
const basicAuth = require("../middlewares/BasicAuth");
const jwtAuth = require("../middlewares/JwtAuth");
const ChuongTrinhDaoTaoController = require("../controllers/ChuongTrinhDaoTaoController");
const ChuongTrinhDaoTaoValidator = require("../validators/ChuongTrinhDaoTaoValidator");

router.get(
  "/getCTDT",
  jwtAuth,
  ChuongTrinhDaoTaoValidator.getCTDTListValidator,
  ChuongTrinhDaoTaoValidator.result,
  ChuongTrinhDaoTaoController.getCTDTList
);

module.exports = router;
