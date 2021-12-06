const { body, param, validationResult, query } = require("express-validator");
const { ErrorResponse } = require("../models/ErrorResponse");

module.exports = {
  getListHocKiNamHocTuanValidation: [
    query("hockinamhoc")
      .trim()
      .notEmpty()
      .withMessage("Vui long nhap hoc ki nam hoc so tuan"),
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
