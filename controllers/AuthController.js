const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const SinhVien = require("../databases/models/SinhVien");
const { ErrorResponse } = require("../models/ErrorResponse");
const { SuccessResponse } = require("../models/SuccessResponse");
const bcrypt = require("bcrypt");
const GiangVien = require("../databases/models/GiangVien");

exports.login = asyncMiddleware(async (req, res, next) => {
  const data = req.body;
  if (data.role === "SV") {
    const checkExistMaSV = await SinhVien.findByPk(data.ma);
    if (checkExistMaSV != null) {
      const checkPassword = await bcrypt.compare(
        data.matkhau,
        checkExistMaSV.MATKHAU
      );
      if (checkPassword) {
        const token = checkExistMaSV.generateToken();
        return res.status(200).json(
          new SuccessResponse(200, {
            message: "Dang nhap thanh cong",
            token: token,
          })
        );
      } else {
        return res.status(400).json(
          new ErrorResponse(400, {
            message: "Ma sinh vien hoac mat khau sai",
          })
        );
      }
    } else {
      return res
        .status(400)
        .json(
          new ErrorResponse(400, { message: "Ma sinh vien khong ton tai" })
        );
    }
  } else if (data.role === "GV") {
    const checkExistMaGV = await GiangVien.findByPk(data.ma);
    if (checkExistMaGV != null) {
      const checkGvPassword = await bcrypt.compare(
        data.matkhau,
        checkExistMaGV.MATKHAU
      );
      if (checkGvPassword) {
        const token = checkExistMaGV.generateToken();
        return res.status(200).json(
          new SuccessResponse(200, {
            message: "Dang nhap thanh cong",
            token: token,
          })
        );
      } else {
        return res.status(400).json(
          new ErrorResponse(400, {
            message: "Ma giang vien hoac mat khau sai",
          })
        );
      }
    } else {
      return res
        .status(400)
        .json(
          new ErrorResponse(400, { message: "Ma giang vien khong ton tai" })
        );
    }
  }
});
