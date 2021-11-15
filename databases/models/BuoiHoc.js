const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const LopHocPhan = require("./LopHocPhan");

class BuoiHoc extends Model {}

BuoiHoc.init(
  {
    MABUOIHOC: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    NGAY: {
      type: DataTypes.DATE,
    },
    PHONGHOC: {
      type: DataTypes.STRING(45),
    },
    TIETBATDAU: {
      type: DataTypes.INTEGER,
    },
    GIOBATDAU: {
      type: DataTypes.INTEGER,
    },
    LOAIBUOI: {
      type: DataTypes.STRING(30),
    },
    LOPHOCPHAN_MALOPHOCPHAN: {
      type: DataTypes.STRING(20),
      references: {
        model: LopHocPhan,
        key: "MALOPHOCPHAN",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "BUOIHOC",
    modelName: "BUOIHOC",
  }
);

LopHocPhan.hasMany(BuoiHoc);

BuoiHoc.belongsTo(LopHocPhan);

module.exports = BuoiHoc;
