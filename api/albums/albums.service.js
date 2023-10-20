const pool = require("../../config/database");

module.exports = {
  createAlbum: (data, callback) => {
    pool.query(
      `INSERT INTO albums(title, description, user_id) VALUES(?,?,?)`,
      [data.title, data.description, data.user_id],
      (error, results) => {
        if (error) {
          return callback(error);
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
  getAlbums: (user_id, callback) => {
    
    pool.query(`SELECT * FROM albums WHERE user_id = ?`, [user_id], (error, results) => {
      if (error) {
        return callback(error);
      }
      callback(null, results);
    });
  },
  getAlbumByAlbumId: (id, callback) => {
    pool.query(
      `SELECT * FROM albums WHERE id = ?`,
      [id],
      (error, albumResults) => {
        if (error) {
          return callback(error);
        }
        const album = albumResults[0];
        pool.query(
          `SELECT * FROM photos WHERE album_id = ?`,
          [id],
          (error, photoResults) => {
            if (error) {
              return callback(error);
            }
            album.photos = photoResults;
            callback(null, album);
          }
        );
      }
    );
  },
  updateAlbums: (id, data, callback) => {
    pool.query(
      `UPDATE albums SET title = ?, description = ?, user_id = ? WHERE id = ?`,
      [data.title, data.description, data.user_id, id],
      (error) => {
        if (error) {
          return callback(error);
        }
        const updatedAlbums = {
          title: data.title,
          user_id: data.user_id,
          id: id,
        };
        callback(null, updatedAlbums);
      }
    );
  },
  addPhotoToAlbum: (albumId, photoId, callback) => {
    pool.query(
      //   `INSERT INTO photos(album_id, photo_data) VALUES(?,?)`,
      `UPDATE photos SET album_id = ? WHERE id = ?`,
      [albumId, photoId],
      (error, results) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        callback(null, results);
      }
    );
  },
};
