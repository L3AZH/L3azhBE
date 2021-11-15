const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");

class DonVi extends Model {}

DonVi.init(
  {
    MADONVI: {
      primaryKey: true,
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    TENDONVI: {
      type: DataTypes.STRING(45),
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "DONVI",
    modelName: "DONVI",
  }
);

module.exports = DonVi;
