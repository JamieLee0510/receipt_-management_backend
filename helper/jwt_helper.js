const JWT = require("jsonwebtoken");
const httpError = require("http-errors");

//secret area
ACCESS_TOKEN_SECRET =
  "a23d0fde7a3e71a4288cd5fa134e893904339f0520eb5e64cab8d563c769e50c4bc51645ecbfee1599e827ec57d0189d2fb7aaccfc1c6bba1aac02a63d73d11f";
REFRESH_TOKEN_SECRET =
  "d9a6e80433bb63a499f5327df2c04ead7418f9bfb199df89cd4fed88eb216d41b7b43868a37c4842aca1208d0884b4d1e5dccdf29eeddf458c29d0f49efc5152";

module.exports = {
  signAccessToken: (userID) => {
    return new Promise((resolve, reject) => {
      //need to modify when upload
      // const secret = process.env.ACCESS_TOKEN_SECRET;
      const secret = ACCESS_TOKEN_SECRET;
      const options = { expiresIn: "1y" };
      JWT.sign({ userID: userID }, secret, options, (err, token) => {
        if (err) {
          console.log("signAccessToken fail");
          console.log(err.message);
          reject(httpError.InternalServerError());
        } else {
          resolve(token);
        }
      });
    });
  },
  signRefreshToken: (userID) => {
    return new Promise((resolve, reject) => {
      //need to modify when upload
      // const secret = process.env.REFRESH_TOKEN_SECRET;
      const secret = REFRESH_TOKEN_SECRET;
      const options = { expiresIn: "1y" };
      JWT.sign({ userID: userID }, secret, options, (err, token) => {
        if (err) {
          console.log("signAccessToken fail");
          console.log(err.message);
          reject(httpError.InternalServerError());
        } else {
          resolve(token);
        }
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) {
      console.log("no header");
      return next(httpError.Unauthorized());
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    //need to modify when upload
    // JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    JWT.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        // console.log("verifyAccessToken, JWT verify fail");
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        req.payload = "Unauthorized";
        console.log("err message", message);
      } else {
        req.payload = payload;
      }
      next();
    });
  },
  //To do
  //verifyRefreshToken
};
