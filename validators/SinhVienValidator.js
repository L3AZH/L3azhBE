const { body, param, validationResult, query } = require("express-validator");
const { ErrorResponse } = require("../models/ErrorResponse");
const SinhVien = require("../databases/models/SinhVien");

module.exports = {
  registerSinhVienValidation: [
    body("masv")
      .trim()
      .toUpperCase()
      .notEmpty()
      .withMessage("Vui long dien ma sinh vien( key masv)")
      .isLength({ min: 10, max: 10 })
      .withMessage("Ma sinh vien khong hop le")
      .custom(async (value) => {
        const checkMaSvExist = await SinhVien.findByPk(value);
        if (checkMaSvExist != null) {
          return Promise.reject(
            "Ma sinh vien nay da ton tai, vui long nhap ma khac"
          );
        }
      }),
    body("hoten")
      .trim()
      .notEmpty()
      .withMessage("Vui long dien ho va ten")
      .isLength({ max: 50 })
      .withMessage("Ho va ten khong vuot qua 50 ki tu"),
    body("ngaysinh")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap ngay sinh")
      .isDate({ format: "YYYY/MM/dd" })
      .withMessage("Ngay sinh khong hop le"),
    body("phai")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap gioi tinh/phai")
      .isLength({ max: 3 })
      .withMessage("Gioi tinh/phai khong hop le vui long nhap lai")
      .custom(async (value) => {
        if (!(value === "nam")) {
          if (!(value === "nu")) {
            return Promise.reject(
              "Gioi tinh/phai khong hop le vui long nhap lai"
            );
          }
        }
      }),
    body("noisinh")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap noi sinh")
      .isLength({ max: 45 })
      .withMessage("Noi sinh toi da 45 ky tu"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap email")
      .isEmail()
      .withMessage("Email khong hop le vui long nhap lai"),
    body("matkhau")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap mat khau")
      .isLength({ min: 5 })
      .withMessage("Mat khau toi thieu 5 ky tu"),
    body("anhdaidien")
      .isArray()
      .withMessage("Du lieu anh dai dien khong hop le"),
  ],
  getInfoSinhVienValidation: [
    query("masv")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap ma sinh vien")
      .custom(async (value) => {
        const findResult = await SinhVien.findByPk(value);
        if (findResult == null) {
          return Promise.reject(
            new ErrorResponse(404, { message: "Khong tim thay ma sinh vien" })
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
