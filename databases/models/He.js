const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");

class He extends Model {}

He.init(
  {
    MAHE: {
      primaryKey: true,
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    TENHE: {
      type: DataTypes.STRING(45),
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "HE",
    modelName: "HE",
  }
);

module.exports = He;
