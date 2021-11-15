const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const GiangVien = require("./GiangVien");
const MonHoc = require("./MonHoc");

class LopHocPhan extends Model {}

LopHocPhan.init(
  {
    MALOPHOCPHAN: {
      primaryKey: true,
      type: DataTypes.STRING(20),
      allowNull: false,
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
    GIANGVIEN_MAGIANGVIEN: {
      type: DataTypes.STRING(20),
      references: {
        model: GiangVien,
        key: "MAGIANGVIEN",
      },
    },
    MONHOC_MAMONHOC: {
      type: DataTypes.STRING(15),
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
