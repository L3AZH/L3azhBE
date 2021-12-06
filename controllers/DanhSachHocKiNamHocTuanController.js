const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const { ErrorResponse } = require("../models/ErrorResponse");
const { SuccessResponse } = require("../models/SuccessResponse");
const sequelize = require("../databases/DbConnection");
const { QueryTypes } = require("sequelize");

exports.getListHocKiNamHocTuan = asyncMiddleware(async (req, res, next) => {
  const hocKiNamHoc = req.query.hockinamhoc;
  const queryResult = await sequelize.query(
    "select * from DANHSACHHOCKINAMHOCTUAN where HOCKINAMHOCSOTUAN like :hockinamhoc",
    {
      type: QueryTypes.SELECT,
      replacements: { hockinamhoc: `${hocKiNamHoc}%` },
    }
  );
  if (queryResult == null || queryResult.length == 0) {
    return res.status(404).json(
      new ErrorResponse(404, {
        message: "Hoc ki trong nam hoc nay chua nhap du lieu tuan",
      })
    );
  } else {
    return res.status(200).json(new SuccessResponse(200, queryResult));
  }
});
