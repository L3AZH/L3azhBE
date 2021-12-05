const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const SinhVien = require("./SinhVien");

class ToKhai extends Model {}

ToKhai.init(
  {
    MATOKHAI: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
    },
    TINHTRANGSUCKHOE: {
      type: DataTypes.STRING(45),
    },
    NOIDI: {
      type: DataTypes.STRING(45),
    },
    NOIDEN: {
      type: DataTypes.STRING(45),
    },
    NGAYGIO: {
      type: DataTypes.BIGINT,
    },
    MAQR: {
      type: DataTypes.BLOB,
    },
    SINHVIENMASINHVIEN: {
      type: DataTypes.STRING(10),
      field: "SINHVIEN_MASINHVIEN",
      references: {
        model: SinhVien,
        key: "MASINHVIEN",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "TOKHAI",
    modelName: "TOKHAI",
  }
);

SinhVien.hasMany(ToKhai);
ToKhai.belongsTo(SinhVien);

module.exports = ToKhai;
