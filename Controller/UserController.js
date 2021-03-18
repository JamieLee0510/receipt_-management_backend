const pool = require("../model/db");
const createError = require("http-errors");

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helper/jwt_helper");

module.exports = {
  register: async (req, res, next) => {
    try {
      const req_data = req.body;

      const doseExist = await pool.query(
        "SELECT email FROM userdata WHERE email=($1)",
        [req_data.username]
      );
      if (doseExist.rows.length !== 0) {
        res.send({
          success: false,
          message: "此名字已有人使用，請使用其他名字",
        });
        throw createError.Conflict(
          `${req_data.email} is already been registered`
        );
      }
      const new_user = await pool.query(
        "INSERT INTO userdata (email, password, name) VALUES ($1, $2, $3) RETURNING *",
        [req_data.email, req_data.password, req_data.name]
      );
      //to do, maybe need to modify
      console.log(new_user.rows[0]);
      const accessToken = await signAccessToken(new_user.rows[0].user_id);
      const refreshToken = await signRefreshToken(new_user.rows[0].user_id);
      console.log("register accesstoken", accessToken);
      return res.json({
        status: "success",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
  login: async (req, res) => {
    const req_data = req.body;

    const user = await pool.query("SELECT * FROM userdata WHERE email=($1)", [
      req_data.email,
    ]);
    if (user.rows.length === 0) {
      res.send({
        success: false,
        message: "此帳號尚未註冊",
      });
      throw createError.NotFound("User not registered");
    } else if (user.rows[0].password !== req_data.password) {
      res.send({
        success: false,
        message: "密碼錯誤",
      });
      throw createError.Unauthorized("Username/password not valid");
    } else {
      const accessToken = await signAccessToken(user.rows[0].user_id);
      const refreshToken = await signRefreshToken(user.rows[0].user_id);
      console.log("login success");
      return res.send({ accessToken: accessToken, refreshToken: refreshToken });
    }
  },

  //Vue webApp 測試auth的終端
  //    user: (req, res) => {
  //     const auth = req.payload.username;
  //     console.log(auth);
  //     return res.json({
  //       status: "success",
  //       data: auth,
  //     });
  //   },
};
