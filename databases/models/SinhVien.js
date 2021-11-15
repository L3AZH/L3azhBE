const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const Lop = require("./Lop");

class SinhVien extends Model {
  generateToken() {
    const payload = { id: this.MASINHVIEN };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
  }
}

SinhVien.init(
  {
    MASINHVIEN: {
      primaryKey: true,
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    HOTEN: {
      type: DataTypes.STRING(50),
    },
    NGAYSINH: {
      type: DataTypes.DATE,
    },
    PHAI: {
      type: DataTypes.STRING(3),
    },
    NOISINH: {
      type: DataTypes.STRING(45),
    },
    EMAIL: {
      type: DataTypes.STRING(50),
    },
    MATKHAU: {
      type: DataTypes.STRING(1000),
    },
    ANHDAIDIEN: {
      type: DataTypes.BLOB,
    },
    LOP_MALOP: {
      type: DataTypes.STRING(20),
      references: {
        model: Lop,
        key: "MALOP",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "SINHVIEN",
    modelName: "SINHVIEN",
  }
);

Lop.hasMany(SinhVien);
SinhVien.belongsTo(Lop);

module.exports = SinhVien;
