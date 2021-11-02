const sequelize = require("../DbConnection");
const { DataTypes, Model } = require("sequelize");
const jwt = require("jsonwebtoken");

class GiangVien extends Model {
  generateToken() {
    const payload = { id: this.MAGIANGVIEN };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
  }
}

GiangVien.init(
  {
    MAGIANGVIEN: {
      primaryKey: true,
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    HOTEN: {
      type: DataTypes.STRING(45),
    },
    NGAYSINH: {
      type: DataTypes.DATE,
    },
    GIOITINH: {
      type: DataTypes.STRING(3),
    },
    TRINHDO: {
      type: DataTypes.STRING(20),
    },
    TRANGTHAILAMVIEC: {
      type: DataTypes.INTEGER,
    },
    MATKHAU: {
      type: DataTypes.STRING(1000),
    },
    ANHDAIDIEN: {
      type: DataTypes.BLOB,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "GIANGVIEN",
    modelName: "GIANGVIEN",
  }
);

module.exports = GiangVien;
