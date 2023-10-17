const pool = require("../../config/database");

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

  getPhotos: (callback) => {
    pool.query(`SELECT * FROM photos`, [], (error, results) => {
      if (error) {
        return callback(error);
      }
      const photos = results.map((photo) => ({
        id: photo.id,
        title: photo.title,
        image_url: photo.image_url,
        description: photo.description,
        album_id: photo.album_id,
      }));
      callback(null, photos);
    });
  },

  getPhotoByPhotoId: (photoId, callback) => {
    pool.query(
      `SELECT * FROM photos WHERE id = ?`,
      [photoId],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        const { id, title, description, image_url } = results[0];
        callback(null, { id, title, description, image_url });
      }
    );
  },

  updatePhoto: (data, photoId, callback) => {
    pool.query(
      `UPDATE photos SET title = ?, description = ? WHERE id = ?`,
      [data.title, data.description, photoId],
      (error, results) => {
        if (error) {
          console.log(error);
          return callback(error);
        }

        const updatedPhoto = {
          title: data.title,
          image_url: data.image_url,
          description: data.description,
          user_id: data.user_id,
          id: photoId,
        };
        callback(null, updatedPhoto);
      }
    );
  },
};
