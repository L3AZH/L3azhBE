const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const KhoiLop = require("./KhoiLop");
const MonHoc = require("./MonHoc");

class ChuongTrinhDaoTao extends Model {}

ChuongTrinhDaoTao.init(
  {
    KHOILOPMAKHOILOP: {
      type: DataTypes.STRING(20),
      field: "KHOILOP_MAKHOILOP",
      references: {
        model: KhoiLop,
        key: "MAKHOILOP",
      },
    },
    MONHOCMAMONHOC: {
      type: DataTypes.STRING(15),
      field: "MONHOC_MAMONHOC",
      references: {
        model: MonHoc,
        key: "MAMONHOC",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "CHUONGTRINHDAOTAO",
    modelName: "CHUONGTRINHDAOTAO",
  }
);

KhoiLop.belongsToMany(MonHoc, { through: "CHUONGTRINHDAOTAO" });
MonHoc.belongsToMany(KhoiLop, { through: "CHUONGTRINHDAOTAO" });

module.exports = ChuongTrinhDaoTao;
