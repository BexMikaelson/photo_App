const {
    createPhoto,
    getPhotos,
    getPhotoByPhotoId,
    updatePhoto
} = require('./photos.service');

module.exports = {
    createPhoto: (req, res) => {
        const body = req.body;
        createPhoto(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getPhotos: (req, res) => {
        getPhotos((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getPhotoByPhotoId: (req, res) => {
        const id = req.params.photoId;
        getPhotoByPhotoId(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updatePhoto: (req, res) => {
        const body = req.body;
        updatePhoto(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully"
            });
        });
    }
};       
       
