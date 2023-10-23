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
  getAlbumByAlbumId: (id, user_id, callback) => {
    pool.query(
      `SELECT * FROM albums WHERE id = ? AND user_id = ? `,
      [id, user_id],
      (error, albumResults) => {
        if (error) {
          return callback(error);
        }
        const album = albumResults[0];
        if (!album) {
          return callback(null, null);
        }
        pool.query(
          `SELECT * FROM photos WHERE album_id = ? AND user_id = ?`,
          [id, user_id],
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
      `UPDATE albums SET title = ?, description = ? WHERE id = ? AND user_id = ?`,
      [data.title, data.description, id, data.user_id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        if (results.affectedRows === 0) {
          return callback(new Error("No such album found or user does not have permission to update it."));
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
  /* addPhotoToAlbum: (albumId, photoId, userId, callback) => {
    
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
  }, */
  addPhotoToAlbum: (albumId, photoId, userId, callback) => {
    
    // Check if the album exists and belongs to the logged-in user
    pool.query(
        `SELECT * FROM albums WHERE id = ? AND user_id = ?`,
        [albumId, userId],
        (error, albumResults) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            if (!albumResults.length) {
                return callback(new Error("Album not found or not owned by the user"));
            }

            // If the album exists and belongs to the user, update the photo
            pool.query(
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
        }
    );
},

};
