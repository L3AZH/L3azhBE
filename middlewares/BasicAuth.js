const e = require("express");
const { ErrorResponse } = require("../models/ErrorResponse");

const basicAuth = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Basic")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decode = new Buffer.from(token, "base64").toString();
    if (
      decode ===
      `${process.env.BASICAUTH_USER}:${process.env.BASICAUTH_PASSWORD}`
    ) {
      next();
    } else {
      console.log(decode);
      return res
        .status(401)
        .json(
          new ErrorResponse(401, { message: "Invalid token, access denied !!" })
        );
    }
  } else {
    res
      .status(401)
      .json(
        new ErrorResponse(401, { message: "Invalid token, access denied !!" })
      );
  }
};

module.exports = basicAuth;
