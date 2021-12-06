const { body, param, validationResult, query } = require("express-validator");
const SinhVien = require("../databases/models/SinhVien");
const DanhSachHocKiNamHocTuan = require("../databases/models/DanhSachHocKiNamHocTuan");
const { ErrorResponse } = require("../models/ErrorResponse");

module.exports = {
  getLichHocValidation: [
    query("hockinamhocsotuan")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap hoc ki nam hoc so tuan")
      .custom(async (value) => {
        const findResult = await DanhSachHocKiNamHocTuan.findByPk(value);
        if (findResult == null) {
          return Promise.reject(
            new ErrorResponse(404, {
              message:
                "Tuan cua hoc ki trong nam hoc nay khong ton tai trong csdl ",
            })
          );
        }
      }),
    query("masinhvien")
      .trim()
      .toUpperCase()
      .notEmpty()
      .withMessage("Vui long nhap ma sinh vien")
      .custom(async (value) => {
        const findResult = await SinhVien.findByPk(value);
        if (findResult == null) {
          return Promise.reject(
            new ErrorResponse(404, {
              message: "Ma sinh vien nay khong ton tai",
            })
          );
        }
      }),
  ],
  result: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (errors.array()[0].msg.code == null) {
        return res
          .status(400)
          .json(new ErrorResponse(400, { message: errors.array()[0].msg }));
      } else {
        return res
          .status(errors.array()[0].msg.code)
          .json(errors.array()[0].msg);
      }
    }
    next();
  },
};
