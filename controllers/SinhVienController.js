const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const SinhVien = require("../databases/models/SinhVien");
const { ErrorResponse } = require("../models/ErrorResponse");
const { SuccessResponse } = require("../models/SuccessResponse");
const bcrypt = require("bcrypt");
const moment = require("moment");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(parseInt(process.env.DB_NUMBERSALT));
  return bcrypt.hash(password, salt);
}

exports.registerSinhVienAccount = asyncMiddleware(async (req, res, next) => {
  const data = req.body;
  const createSvResult = await SinhVien.create({
    MASINHVIEN: data.masv,
    HOTEN: data.hoten,
    NGAYSINH: data.ngaysinh,
    PHAI: data.phai,
    NOISINH: data.noisinh,
    EMAIL: data.email,
    MATKHAU: await hashPassword(data.matkhau),
  });
  return res.status(200).json(
    new SuccessResponse(200, {
      message: "Tao sinh vien moi thanh cong",
      newObject: {
        MASINHVIEN: createSvResult.MASINHVIEN,
        HOTEN: createSvResult.HOTEN,
        NGAYSINH: moment(createSvResult.NGAYSINH).format("DD/MM/YYYY"),
        PHAI: createSvResult.PHAI,
        NOISINH: createSvResult.NOISINH,
        EMAIL: createSvResult.EMAIL,
      },
    })
  );
});
