const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const KhoiLop = require("./KhoiLop");

class Lop extends Model {}

Lop.init(
  {
    MALOP: {
      primaryKey: true,
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    TENLOP: {
      type: DataTypes.STRING(45),
    },
    NIENKHOA: {
      type: DataTypes.STRING(20),
    },
    SOLUONGSINHVIEN: {
      type: DataTypes.INTEGER,
    },
    KHOILOP_MAKHOILOP: {
      type: DataTypes.STRING(20),
      references: {
        model: KhoiLop,
        key: "MAKHOILOP",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "LOP",
    modelName: "LOP",
  }
);

KhoiLop.hasMany(Lop);
Lop.belongsTo(KhoiLop);

module.exports = Lop;
