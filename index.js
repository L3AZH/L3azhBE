const express = require("express");
const ErrorServerHandler = require("./middlewares/ErrorServerHandler");
require("dotenv").config();
const app = express();
const port = process.env.port || 3000;

app.use(ErrorServerHandler);
app.listen(() => console.log(`Server is running on port ${port}`));
