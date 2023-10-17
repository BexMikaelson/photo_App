const pool = require('../../config/database');

module.exports = {

    createPhoto: (data, callback) => {
        pool.query(
            `INSERT INTO photos(title, description, album_id) VALUES(?,?,?)`,
            [data.title, data.description, data.album_id],
            (error, results) => {
                if (error) {
                    callback(error);
                }
                callback(null, results);
            }
        );
    },

    getPhotos: callback => {
        pool.query(
            `SELECT * FROM photos`,
            [],
            (error, results) => {
                if (error) {
                    callback(error);
                }
                callback(null, results);
            }
        );
    },

    getPhotoByPhotoId: (photoId, callback) => {
        pool.query(
            `SELECT * FROM photos WHERE id = ?`,
            [photoId],
            (error, results) => {
                if (error) {
                    callback(error);
                }
                callback(null, results[0]);
            }
        );
    },

    updatePhoto: (data, photoId, callback) => {
        pool.query(
            `UPDATE photos SET title = ?, description = ? WHERE id = ?`,
            [data.title, data.description, photoId],
            (error, results) => {
                if (error) {
                    callback(error);
                }
                callback(null, results);
            }
        );
    }
};
