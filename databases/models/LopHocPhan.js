const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const GiangVien = require("./GiangVien");
const MonHoc = require("./MonHoc");

class LopHocPhan extends Model {}

LopHocPhan.init(
  {
    MALOPHOCPHAN: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    TOTHUCHANH: {
      type: DataTypes.INTEGER,
    },
    DANHSACHTUANHOC: {
      type: DataTypes.STRING(30),
    },
    SOTIET: {
      type: DataTypes.INTEGER,
    },
    HOCKINAMHOC: {
      type: DataTypes.INTEGER,
    },
    GIANGVIENMAGIANGVIEN: {
      type: DataTypes.STRING(20),
      field: "GIANGVIEN_MAGIANGVIEN",
      references: {
        model: GiangVien,
        key: "MAGIANGVIEN",
      },
    },
    MONHOCMAMONHOC: {
      type: DataTypes.STRING(15),
      field: "MONHOC_MAMONHOC",
      references: {
        model: MonHoc,
        key: "MAMONHOC",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "LOPHOCPHAN",
    modelName: "LOPHOCPHAN",
  }
);

MonHoc.hasMany(LopHocPhan);
GiangVien.hasMany(LopHocPhan);

LopHocPhan.belongsTo(MonHoc);
LopHocPhan.belongsTo(GiangVien);

module.exports = LopHocPhan;
