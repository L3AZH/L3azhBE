const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const { ErrorResponse } = require("../models/ErrorResponse");
const { SuccessResponse } = require("../models/SuccessResponse");
const bcrypt = require("bcrypt");
const moment = require("moment");
const _ = require("lodash");
const GiangVien = require("../databases/models/GiangVien");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(parseInt(process.env.DB_NUMBERSALT));
  return bcrypt.hash(password, salt);
}

exports.registerGiangVienAccount = asyncMiddleware(async (req, res, next) => {
  const data = req.body;
  const createGvResult = await GiangVien.create({
    MAGIANGVIEN: data.magv,
    HOTEN: data.hoten,
    NGAYSINH: data.ngaysinh,
    GIOITINH: data.gioitinh,
    TRINHDO: data.trinhdo,
    TRANGTHAILAMVIEC: data.trangthailamviec,
    MATKHAU: await hashPassword(data.matkhau),
  });
  return res.status(200).json(
    new SuccessResponse(200, {
      message: "Tao giang vien moi thanh cong",
      newObject: {
        MAGIANGVIEN: createGvResult.MAGIANGVIEN,
        HOTEN: createGvResult.HOTEN,
        NGAYSINH: moment(createGvResult.NGAYSINH).format("DD/MM/YYYY"),
        GIOITINH: createGvResult.GIOITINH,
        TRINHDO: createGvResult.TRINHDO,
        TRANGTHAILAMVIEC: createGvResult.TRANGTHAILAMVIEC,
      },
    })
  );
});

exports.getInfoGiangVien = asyncMiddleware(async (req, res, next) => {
  const magv = req.query.magv;
  const resultFind = await GiangVien.findByPk(magv);
  return res
    .status(200)
    .json(
      new SuccessResponse(200, _.omit((await resultFind).toJSON(), ["MATKHAU"]))
    );
});
