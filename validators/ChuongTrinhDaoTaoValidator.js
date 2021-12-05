const { body, param, validationResult, query } = require("express-validator");
const SinhVien = require("../databases/models/SinhVien");
const { ErrorResponse } = require("../models/ErrorResponse");

module.exports = {
  getCTDTListValidator: [
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
