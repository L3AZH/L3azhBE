const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const LopHocPhan = require("./LopHocPhan");
const DanhSachHocKiNamHocTuan = require("./DanhSachHocKiNamHocTuan");

class BuoiHoc extends Model {}

BuoiHoc.init(
  {
    MABUOIHOC: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    SOTHUTRONGTUAN: {
      type: DataTypes.INTEGER,
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
    LOPHOCPHANMALOPHOCPHAN: {
      type: DataTypes.INTEGER,
      field: "LOPHOCPHAN_MALOPHOCPHAN",
      references: {
        model: LopHocPhan,
        key: "MALOPHOCPHAN",
      },
    },
    DANHSACHHOCKINAMHOCTUANHOCKINAMHOCSOTUAN: {
      type: DataTypes.STRING(20),
      field: "DANHSACHHOCKINAMHOCTUAN_HOCKINAMHOCSOTUAN",
      references: {
        model: DanhSachHocKiNamHocTuan,
        key: "HOCKINAMHOCSOTUAN",
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

DanhSachHocKiNamHocTuan.hasMany(BuoiHoc);

BuoiHoc.belongsTo(DanhSachHocKiNamHocTuan);

module.exports = BuoiHoc;
