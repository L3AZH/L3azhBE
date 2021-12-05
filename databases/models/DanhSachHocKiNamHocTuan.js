const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");

class DanhSachHocKiNamHocTuan extends Model {}

DanhSachHocKiNamHocTuan.init(
  {
    HOCKINAMHOCSOTUAN: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    NGAYBATDAU: {
      type: DataTypes.DATE,
    },
    NGAYKETTHUC: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "DANHSACHHOCKINAMHOCTUAN",
    modelName: "DANHSACHHOCKINAMHOCTUAN",
  }
);

module.exports = DanhSachHocKiNamHocTuan;
