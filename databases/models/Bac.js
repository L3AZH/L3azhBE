const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");

class Bac extends Model {}

Bac.init(
  {
    MABAC: {
      primaryKey: true,
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    TENBAC: {
      type: DataTypes.STRING(45),
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "BAC",
    modelName: "BAC",
  }
);

module.exports = Bac;
