const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const SinhVien = require("./SinhVien");
const LopHocPhan = require("./LopHocPhan");

class Hoc extends Model {}

Hoc.init(
  {
    SINHVIENMASINHVIEN: {
      type: DataTypes.STRING(10),
      field: "SINHVIEN_MASINHVIEN",
      references: {
        model: SinhVien,
        key: "MASINHVIEN",
      },
    },
    LOPHOCPHANMALOPHOCPHAN: {
      type: DataTypes.INTEGER,
      field: "LOPHOCPHAN_MALOPHOCPHAN",
      references: {
        model: LopHocPhan,
        key: "MALOPHOCPHAN",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "HOC",
    modelName: "HOC",
  }
);

SinhVien.belongsToMany(LopHocPhan, { through: "HOC" });
LopHocPhan.belongsToMany(SinhVien, { through: "HOC" });

module.exports = Hoc;
