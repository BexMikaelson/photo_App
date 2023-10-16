const {
    createAlbum, 
    getAlbumByAlbumId, 
    getAlbums, 
    updateAlbum, 
    addPhotoToAlbum 
} = require('./albums.service');

/* const { genSaltSync, hashSync, compareSync} = require('bcrypt'); */
module.exports = {
    createAlbum: (req, res) => {
        const body = req.body;
        /* const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt); */
        createAlbum(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error: ' + err.message 
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getAlbums: (req, res) => {
        getAlbums((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getAlbumByAlbumId: (req, res) => {
        const id = req.params.albumId;
        getAlbumByAlbumId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Album not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateAlbum: (req, res) => {
        const id = req.params.albumId;
        const body = req.body;
        updateAlbum(id, body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Failed to update album'
                });
            }
            return res.json({
                success: 1,
                message: 'Album updated successfully'
            });
        });
    },

    addPhotoToAlbum: (req, res) => {
        // You need to define the structure of adding a photo.
        // This function is just a placeholder and might require more details.
    }
}
