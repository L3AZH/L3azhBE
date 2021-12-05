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
    NGANHMANGANH: {
      type: DataTypes.STRING(20),
      field: "NGANH_MANGANH",
      references: {
        model: Nganh,
        key: "MANGANH",
      },
    },
    DONVIMADONVI: {
      type: DataTypes.STRING(20),
      field: "DONVI_MADONVI",
      references: {
        model: DonVi,
        key: "MADONVI",
      },
    },
    BACHEMABACHE: {
      type: DataTypes.STRING(3),
      field: "BACHE_MABACHE",
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
