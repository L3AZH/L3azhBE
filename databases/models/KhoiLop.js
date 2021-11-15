const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const Nganh = require("./Nganh");
const DonVi = require("./DonVi");
const BacHe = require("./BacHe");

class KhoiLop extends Model {}

KhoiLop.init(
  {
    MAKHOILOP: {
      primaryKey: true,
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    NAMHOCHOCKIVAO: {
      type: DataTypes.INTEGER,
    },
    NAMHOCHOCKIRA: {
      type: DataTypes.INTEGER,
    },
    NGANH_MANGANH: {
      type: DataTypes.STRING(20),
      references: {
        model: Nganh,
        key: "MANGANH",
      },
    },
    DONVI_MADONVI: {
      type: DataTypes.STRING(20),
      references: {
        model: DonVi,
        key: "MADONVI",
      },
    },
    BACHE_MABACHE: {
      type: DataTypes.STRING(3),
      references: {
        model: BacHe,
        key: "MABACHE",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "KHOILOP",
    modelName: "KHOILOP",
  }
);

BacHe.hasMany(KhoiLop);
Nganh.hasMany(KhoiLop);
DonVi.hasMany(KhoiLop);

KhoiLop.belongsTo(BacHe);
KhoiLop.belongsTo(Nganh);
DonVi.belongsTo(DonVi);

module.exports = KhoiLop;
