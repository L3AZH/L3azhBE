const { body, param, validationResult } = require("express-validator");
const { ErrorResponse } = require("../models/ErrorResponse");
const GiangVien = require("../databases/models/GiangVien");

module.exports = {
  registerGiangVienValidation: [
    body("magv")
      .trim()
      .toUpperCase()
      .notEmpty()
      .withMessage("Vui long dien ma giang vien( key magv)")
      .isLength({ min: 9, max: 20 })
      .withMessage("Ma giang vien khong hop le")
      .custom(async (value) => {
        const checkMaGvExist = await GiangVien.findByPk(value);
        if (checkMaGvExist != null) {
          return Promise.reject(
            "Ma giang vien nay da ton tai, vui long nhap ma khac"
          );
        }
      }),
    body("hoten")
      .trim()
      .notEmpty()
      .withMessage("Vui long dien ho va ten")
      .isLength({ max: 45 })
      .withMessage("Ho va ten khong vuot qua 50 ki tu"),
    body("ngaysinh")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap ngay sinh")
      .isDate({ format: "YYYY/MM/dd" })
      .withMessage("Ngay sinh khong hop le"),
    body("gioitinh")
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
    body("trinhdo")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap trinh do")
      .isLength({ max: 20 })
      .withMessage("Trinh do toi da 20 ky tu"),
    body("trangthailamviec")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap trang thai lam viec")
      .isNumeric()
      .withMessage("Trang thai lam viec khong hop le vui long nhap lai"),
    body("matkhau")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap mat khau")
      .isLength({ min: 5 })
      .withMessage("Mat khau toi thieu 5 ky tu"),
    // body("anhdaidien")
    //   .isArray()
    //   .withMessage("Du lieu anh dai dien khong hop le"),
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
