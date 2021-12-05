const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const Qc = require("./Qc");
const Bac = require("./Bac");
const He = require("./He");

class BacHe extends Model {}

BacHe.init(
  {
    MABACHE: {
      primaryKey: true,
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    TENBACHE: {
      type: DataTypes.STRING(45),
    },
    QAMAQC: {
      type: DataTypes.STRING(15),
      field: "QC_MAQC",
      references: {
        model: Qc,
        key: "MAQC",
      },
    },
    BACMABAC: {
      type: DataTypes.STRING(2),
      field: "BAC_MABAC",
      references: {
        model: Bac,
        key: "MABAC",
      },
    },
    HEMAHE: {
      type: DataTypes.STRING(2),
      field: "HE_MAHE",
      references: {
        model: He,
        key: "MAHE",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "BACHE",
    modelName: "BACHE",
  }
);

Bac.hasMany(BacHe);
He.hasMany(BacHe);
Qc.hasMany(BacHe);

BacHe.belongsTo(Bac);
BacHe.belongsTo(He);
BacHe.belongsTo(Qc);

module.exports = BacHe;
