const { body, param, validationResult, query } = require("express-validator");
const { ErrorResponse } = require("../models/ErrorResponse");
const ToKhai = require("../databases/models/ToKhai");
const SinhVien = require("../databases/models/SinhVien");

module.exports = {
  getListHealthDeclarationValidation: [
    query("masv")
      .trim()
      .notEmpty()
      .toUpperCase()
      .notEmpty()
      .withMessage("Vui long dien ma sinh vien( key masv)")
      .isLength({ min: 10, max: 10 })
      .withMessage("Ma sinh vien khong hop le")
      .custom(async (value) => {
        const findSvResult = await SinhVien.findByPk(value);
        if (findSvResult == null) {
          return Promise.reject(
            new ErrorResponse(404, {
              message: "Ma sinh vien nay khong ton tai",
            })
          );
        }
        const findResult = await ToKhai.findAll({
          where: { SINHVIENMASINHVIEN: value },
        });
        if (findResult == null || findResult.length == 0) {
          return Promise.reject(
            new ErrorResponse(404, {
              message: "Sinh vien nay khong co to khai nao",
            })
          );
        }
      }),
  ],
  createNewHealthDeclarationValidation: [
    body("tinhtrangsuckhoe")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap tinh trang suc khoe"),
    body("noidi")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap noi di")
      .isLength({ max: 45 })
      .withMessage("Thong tin toi da 45 ky tu"),
    body("noiden")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap noi den")
      .isLength({ max: 45 })
      .withMessage("Thong tin toi da 45 ky tu"),
    body("ngaygio")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap gio")
      .isNumeric()
      .withMessage("NGay gio khong hop le"),
    body("maqr")
      .notEmpty()
      .withMessage("Vui long upload anh qr")
      .isArray()
      .withMessage("Du lieu anh qr khong hop le"),
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
