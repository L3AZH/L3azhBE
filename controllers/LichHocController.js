const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const { ErrorResponse } = require("../models/ErrorResponse");
const { SuccessResponse } = require("../models/SuccessResponse");
const sequelize = require("../databases/DbConnection");
const { QueryTypes } = require("sequelize");

exports.getLichHoc = asyncMiddleware(async (req, res, next) => {
  const hocKiNamHocSoTuan = req.query.hockinamhocsotuan;
  const masv = req.query.masinhvien;
  const queryResult = await sequelize.query(
    "select LOPHOCPHAN.MONHOC_MAMONHOC, BUOIHOC.SOTHUTRONGTUAN, BUOIHOC.PHONGHOC, BUOIHOC.TIETBATDAU, BUOIHOC.GIOBATDAU, " +
      "DANHSACHHOCKINAMHOCTUAN.HOCKINAMHOCSOTUAN " +
      "from SINHVIEN, HOC, LOPHOCPHAN, BUOIHOC, DANHSACHHOCKINAMHOCTUAN " +
      "where SINHVIEN.MASINHVIEN = HOC.SINHVIEN_MASINHVIEN and LOPHOCPHAN.MALOPHOCPHAN = HOC.LOPHOCPHAN_MALOPHOCPHAN and " +
      "LOPHOCPHAN.MALOPHOCPHAN = BUOIHOC.LOPHOCPHAN_MALOPHOCPHAN and " +
      "BUOIHOC.DANHSACHHOCKINAMHOCTUAN_HOCKINAMHOCSOTUAN = DANHSACHHOCKINAMHOCTUAN.HOCKINAMHOCSOTUAN and " +
      "BUOIHOC.DANHSACHHOCKINAMHOCTUAN_HOCKINAMHOCSOTUAN = :hockinamhocsotuan and " +
      "SINHVIEN.MASINHVIEN = :masinhvien",
    {
      type: QueryTypes.SELECT,
      replacements: { hockinamhocsotuan: hocKiNamHocSoTuan, masinhvien: masv },
    }
  );
  if (queryResult == null || queryResult.length == 0) {
    return res.status(404).json(
      new ErrorResponse(404, {
        message: "Tuan trong hoc ki cua nam hoc nay khong co lich hoc",
      })
    );
  } else {
    return res.status(200).json(new SuccessResponse(200, queryResult));
  }
});
