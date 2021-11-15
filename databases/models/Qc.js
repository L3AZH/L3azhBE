const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");

class Qc extends Model {}

Qc.init(
  {
    MAQC: {
      primaryKey: true,
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    TENQC: {
      type: DataTypes.STRING(45),
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "QC",
    modelName: "QC",
  }
);

module.exports = Qc;
