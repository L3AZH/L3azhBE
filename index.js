const express = require("express");
const ErrorServerHandler = require("./middlewares/ErrorServerHandler");
require("dotenv").config();
const app = express();
const port = process.env.port || 3000;
const baseUrl = process.env.BASEURL;
const sequelize = require("./databases/DbConnection");
sequelize.sync();
app.use(express.json({ limit: "20mb" }));

const AuthRoute = require("./routes/AuthRoute");
const SinhVienRoute = require("./routes/SinhVienRoute");
const GiangVienRoute = require("./routes/GiangVienRoute");
const ToKhaiRoute = require("./routes/ToKhaiRoute");
const ChuongTrinhDaoTaoRoute = require("./routes/ChuongTrinhDaoTaoRoute");

app.use(`${baseUrl}/auth/`, AuthRoute);
app.use(`${baseUrl}/sinhvien/`, SinhVienRoute);
app.use(`${baseUrl}/giangvien/`, GiangVienRoute);
app.use(`${baseUrl}/tokhai/`, ToKhaiRoute);
app.use(`${baseUrl}/CTDT/`, ChuongTrinhDaoTaoRoute);
app.use(ErrorServerHandler);
app.listen(port, () => console.log(`Server is running on port ${port}`));
