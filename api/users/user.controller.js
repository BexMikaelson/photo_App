const {
  create,
  getUserByUserId,
  getUsers,
  getUserByUserEmail,
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "error",
          message: "Database connection error: " + err.message,
        });
      }
      return res.status(200).json({
        status: "success",
        data: results,
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(401).json({
          status: "error",
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const accessToken = sign(
          {
            user_id: results.id,
            email: results.email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "2h",
          }
        );

        const refreshToken = sign(
          {
            user_id: results.id,
          },
          "different_secret_key",
          {
            expiresIn: "1d",
          }
        );

        return res.json({
          status: "success",
          data: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        });
      } else {
        return res.status(401).json({
          status: "error",
          data: "Invalid email or password",
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "error",
          message: "Database connection error: " + err.message,
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: "error",
          message: "Database connection error: " + err.message,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
