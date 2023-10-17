const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into users( username, email, password, firstname, lastname)
      values(?,?,?,?,?)`,
      [data.username, data.email, data.password, data.firstname, data.lastname],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        const createdUser = {
          email: data.email,
          first_name: data.firstname,
          last_name: data.lastname,
        };
        return callback(null, createdUser);
      }
    );
  },
  getUsers: (callback) => {
    pool.query(
      `select id, username, email, password, firstname, lastname from users`,
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
      `select id, username, email, password, firstname, lastname from users where id = ?`,
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
