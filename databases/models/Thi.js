const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const SinhVien = require("./SinhVien");
const LopHocPhan = require("./LopHocPhan");

class Thi extends Model {}
Thi.init(
  {
    SINHVIENMASINHVIEN: {
      type: DataTypes.STRING(10),
      field: "SINHVIEN_MASINHVIEN",
      references: {
        model: SinhVien,
        key: "MASINHVIEN",
      },
    },
    LOPHOCPHANMALOPHOCPHAN: {
      type: DataTypes.INTEGER,
      field: "LOPHOCPHAN_MALOPHOCPHAN",
      references: {
        model: LopHocPhan,
        key: "MALOPHOCPHAN",
      },
    },
    NGAYTHI: {
      type: DataTypes.DATE,
    },
    PHONGTHI: {
      type: DataTypes.STRING(45),
    },
    SOTIETBATDAU: {
      type: DataTypes.INTEGER,
    },
    GIOBATDAU: {
      type: DataTypes.INTEGER,
    },
    SOPHUT: {
      type: DataTypes.INTEGER,
    },
    HEDIEMCC: {
      type: DataTypes.INTEGER,
    },
    HEDIEMSE: {
      type: DataTypes.INTEGER,
    },
    HEDIEMKT: {
      type: DataTypes.INTEGER,
    },
    HEDIEMTH: {
      type: DataTypes.INTEGER,
    },
    HEDIEMTHI: {
      type: DataTypes.INTEGER,
    },
    DIEMCC: {
      type: DataTypes.DOUBLE,
    },
    DIEMSE: {
      type: DataTypes.DOUBLE,
    },
    DIEMKT: {
      type: DataTypes.DOUBLE,
    },
    DIEMTH: {
      type: DataTypes.DOUBLE,
    },
    DIEMTHI: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "THI",
    modelName: "THI",
  }
);

SinhVien.belongsToMany(LopHocPhan, { through: "THI" });
LopHocPhan.belongsToMany(SinhVien, { through: "THI" });

module.exports = Thi;
