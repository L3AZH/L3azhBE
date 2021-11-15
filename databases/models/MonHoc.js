const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");

class MonHoc extends Model {}

MonHoc.init(
  {
    MAMONHOC: {
      primaryKey: true,
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    TENMONHOC: {
      type: DataTypes.STRING(45),
    },
    SOTINCHI: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "MONHOC",
    modelName: "MONHOC",
  }
);

module.exports = MonHoc;
