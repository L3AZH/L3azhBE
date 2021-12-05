const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const { ErrorResponse } = require("../models/ErrorResponse");
const { SuccessResponse } = require("../models/SuccessResponse");
const ChuongTrinhDaoTao = require("../databases/models/ChuongTrinhDaoTao");
const sequelize = require("../databases/DbConnection");
const { QueryTypes } = require("sequelize");

exports.getCTDTList = asyncMiddleware(async (req, res, next) => {
  const masv = req.query.masv;
  const queryResult = await sequelize.query(
    "select MONHOC.MAMONHOC, MONHOC.TENMONHOC, MONHOC.SOTINCHI " +
      "from MONHOC, SINHVIEN, LOP, KHOILOP, CHUONGTRINHDAOTAO " +
      "where CHUONGTRINHDAOTAO.KHOILOP_MAKHOILOP = KHOILOP.MAKHOILOP and " +
      "CHUONGTRINHDAOTAO.MONHOC_MAMONHOC = MONHOC.MAMONHOC and " +
      "KHOILOP.MAKHOILOP = LOP.KHOILOP_MAKHOILOP and " +
      "SINHVIEN.LOP_MALOP = LOP.MALOP and SINHVIEN.MASINHVIEN = :masinhvien",
    { type: QueryTypes.SELECT, replacements: { masinhvien: masv } }
  );
  if (queryResult == null || queryResult.length == 0) {
    return res.status(404).json(
      new ErrorResponse(404, {
        message: "Chuong trinh dao tao cua sinh vien nay chua co",
      })
    );
  } else {
    return res.status(200).json(new SuccessResponse(200, queryResult));
  }
});
