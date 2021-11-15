const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const KhoiLop = require("./KhoiLop");
const MonHoc = require("./MonHoc");

class ChuongTrinhDaoTao extends Model {}

ChuongTrinhDaoTao.init(
  {
    KHOILOP_MAKHOILOP: {
      type: DataTypes.STRING(20),
      references: {
        model: KhoiLop,
        key: "MAKHOILOP",
      },
    },
    MONHOC_MAMONHOC: {
      type: DataTypes.STRING(15),
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
