const pool = require("../config/database");

module.exports = {
  createPhoto: (data, callback) => {
    pool.query(
      `INSERT INTO photos(title, description, album_id, user_id, image_url ) VALUES(?,?,?,?,?)`,
      [data.title, data.description, null, data.user_id, data.image_url],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        const photo = {
          title: data.title,
          image_url: data.image_url,
          description: data.description,
          user_id: data.user_id,
          id: results.insertId,
        };
        callback(null, photo);
      }
    );
  },

  getPhotos: (user_id, callback) => {
    pool.query(
      `SELECT * FROM photos WHERE user_id = ?`,
      [user_id],
      (error, photosResults) => {
        if (error) {
          return callback(error);
        }
        const photos = photosResults.map((photo) => ({
          id: photo.id,
          title: photo.title,
          image_url: photo.image_url,
          description: photo.description,
          album_id: photo.album_id,
        }));
        callback(null, photos);
      }
    );
  },

  getPhotoByPhotoId: (id, user_id, callback) => {
    pool.query(
      `SELECT * FROM photos WHERE id = ? AND user_id = ?`,
      [id, user_id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        if (!results.length) {
          return callback(
            new Error("No photo found with the given id for this user")
          );
        }
        const { id, title, description, image_url } = results[0];
        callback(null, { id, title, description, image_url });
      }
    );
  },

  updatePhoto: (id, body, user_id, callback) => {
    pool.query(
      `UPDATE photos SET title = ?, description = ? WHERE id = ? AND user_id = ?`,
      [body.title, body.description, id, user_id],
      (error, results) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        if (results.affectedRows === 0) {
          return callback(
            new Error("No photo found to update or unauthorized.")
          );
        }
        pool.query(
          `SELECT image_url FROM photos WHERE id = ?`,
          [id],
          (imgError, imgResults) => {
            if (imgError) {
              console.log(imgError);
              return callback(imgError);
            }
            const photoInfo = {
              title: body.title,
              description: body.description,
              image_url: imgResults[0].image_url,
              user_id: user_id,
              id: id,
            };
            callback(null, photoInfo);
          }
        );
      }
    );
  },
};
