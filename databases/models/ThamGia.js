const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const SinhVien = require("./SinhVien");
const BuoiHoc = require("./BuoiHoc");

class ThamGia extends Model {}

ThamGia.init(
  {
    SINHVIEN_MASINHVIEN: {
      type: DataTypes.STRING(10),
      references: {
        model: SinhVien,
        key: "MASINHVIEN",
      },
    },
    BUOIHOC_MABUOIHOC: {
      type: DataTypes.INTEGER,
      references: {
        model: BuoiHoc,
        key: "MABUOIHOC",
      },
    },
    GHICHU: {
      type: DataTypes.STRING(100),
    },
    TINHTRANG: {
      type: DataTypes.STRING(20),
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "THAMGIA",
    tableName: "THAMGIA",
  }
);

SinhVien.belongsToMany(BuoiHoc, { through: "THAMGIA" });
BuoiHoc.belongsToMany(SinhVien, { through: "THAMGIA" });

module.exports = ThamGia;
