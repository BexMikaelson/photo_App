const pool = require("../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into users(email, password, first_name, last_name)
      values(?,?,?,?)`,
      [data.email, data.password, data.first_name, data.last_name],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        const createdUser = {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
        };
        return callback(null, createdUser);
      }
    );
  },
  getUsers: (callback) => {
    pool.query(
      `select id, email, password, first_name, last_name from users`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callback) => {
    pool.query(
      `select id, email, password, first_name, last_name from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
};
