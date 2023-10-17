const pool = require("../../config/database");

module.exports = {
  createAlbum: (data, callback) => {
    pool.query(
      `INSERT INTO albums(title, description, user_id) VALUES(?,?,?)`,
      [data.title, data.description, data.user_id],
      (error, results) => {
        if (error) {
          callback(error);
        }
        const createdAlbum = {
          title: data.title,
          user_id: data.user_id,
          id: results.insertId,
        };
        callback(null, createdAlbum);
      }
    );
  },
  getAlbums: (callback) => {
    pool.query(`SELECT * FROM albums`, [], (error, results) => {
      if (error) {
        callback(error);
      }
      callback(null, results);
    });
  },
  getAlbumByAlbumId: (id, callback) => {
    pool.query(`SELECT * FROM albums WHERE id = ?`, [id], (error, results) => {
      if (error) {
        callback(error);
      }
      callback(null, results[0]);
    });
  },
  updateAlbum: (id, data, callback) => {
    pool.query(
      `UPDATE albums SET title = ?, description = ? WHERE id = ?`,
      [data.title, data.description, id],
      (error, results) => {
        if (error) {
          callback(error);
        }
        callback(null, results);
      }
    );
  },
  addPhotoToAlbum: (albumId, photoData, callback) => {
    // Inget utländskt nyckelförhållande definierat, men vi använder fortfarande album_id som en referens
    pool.query(
      `INSERT INTO photos(album_id, photo_data) VALUES(?,?)`,
      [albumId, photoData],
      (error, results) => {
        if (error) {
          callback(error);
        }
        callback(null, results);
      }
    );
  },
};
