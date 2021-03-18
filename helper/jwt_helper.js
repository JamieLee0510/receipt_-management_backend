const JWT = require("jsonwebtoken");
const httpError = require("http-errors");

module.exports = {
  signAccessToken: (userID) => {
    return new Promise((resolve, reject) => {
      const secret = process.env.ACCESS_TOKEN_SECRET;
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
      const secret = process.env.REFRESH_TOKEN_SECRET;
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
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        // console.log("verifyAccessToken, JWT verify fail");
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(httpError.Unauthorized(message));
      }
      req.payload = payload;
      //   console.log(req.payload);
      next();
    });
  },
  //To do
  //verifyRefreshToken
};
