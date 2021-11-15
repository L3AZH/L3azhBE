const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const SinhVien = require("./SinhVien");
const LopHocPhan = require("./LopHocPhan");

class Hoc extends Model {}

Hoc.init(
  {
    SINHVIEN_MASINHVIEN: {
      type: DataTypes.STRING(10),
      references: {
        model: SinhVien,
        key: "MASINHVIEN",
      },
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
    tableName: "HOC",
    modelName: "HOC",
  }
);

SinhVien.belongsToMany(LopHocPhan, { through: "HOC" });
LopHocPhan.belongsToMany(SinhVien, { through: "HOC" });

module.exports = Hoc;
