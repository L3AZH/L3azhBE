const asyncMiddleware = require("../middlewares/AsyncMiddleware");
const { ErrorResponse } = require("../models/ErrorResponse");
const { SuccessResponse } = require("../models/SuccessResponse");
const ToKhai = require("../databases/models/ToKhai");

exports.createNewHealthDeclaration = asyncMiddleware(async (req, res, next) => {
  const data = req.body;
  const createDeclarationResult = await ToKhai.create({
    TINHTRANGSUCKHOE: data.tinhtrangsuckhoe,
    NOIDI: data.noidi,
    NOIDEN: data.noiden,
    NGAYGIO: data.ngaygio,
    MAQR: Buffer.from(data.maqr),
    SINHVIENMASINHVIEN: data.masinhvien,
  });
  return res.status(200).json(
    new SuccessResponse(200, {
      message: "Luu to khai thanh cong",
      newObject: createDeclarationResult,
    })
  );
});

exports.getListHealthDeclaration = asyncMiddleware(async (req, res, next) => {
  const masv = req.query.masv;
  const resultFind = await ToKhai.findAll({
    where: { SINHVIENMASINHVIEN: masv },
  });
  return res.status(200).json(new SuccessResponse(200, resultFind));
});
