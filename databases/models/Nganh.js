const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");

class Nganh extends Model {}

Nganh.init(
  {
    MANGANH: {
      primaryKey: true,
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    TENNGANH: {
      type: DataTypes.STRING(45),
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "NGANH",
    modelName: "NGANH",
  }
);

module.exports = Nganh;
