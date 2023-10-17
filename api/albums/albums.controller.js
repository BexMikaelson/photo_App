const {
  createAlbum,
  getAlbumByAlbumId,
  getAlbums,
  updateAlbum,
  addPhotoToAlbum,
} = require("./albums.service");

module.exports = {
  createAlbum: (req, res) => {
    const body = req.body;
    body.user_id = req.user.user_id;

    const user_id = req.user.user_id;
    if (!user_id) {
      return res.status(400).json({
        status: "error",
        message: "Required fields are missing",
      });
    }

    createAlbum(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "error",
          message: "Database connection error: " + err.message,
        });
      }
      return res.status(200).json({
        status: "success",
        data: results,
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
        status: "success",
        data: results,
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
        return res.status(404).json({
          status: "error",
          message: "Album not found",
        });
      }
      return res.json({
        status: "success",
        data: results,
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
          status: "error",
          message: "Failed to update album",
        });
      }
      return res.json({
        status: "success",
        message: "Album updated successfully",
      });
    });
  },

  addPhotoToAlbum: (req, res) => {
    const albumId = req.params.albumId;
    const photoData = req.body.photo_data;

    addPhotoToAlbum(albumId, photoData, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
