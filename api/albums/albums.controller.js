const {
  createAlbum,
  getAlbumByAlbumId,
  getAlbums,
  updateAlbums,
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
    const user_id = req.user.user_id;   
    getAlbums(user_id,(err, results) => {
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

  getAlbumByAlbumId: (req, res) => {
    const id = req.params.albumId;
    const user_id = req.user.user_id;
    getAlbumByAlbumId(id, user_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "error",
          message: "Database connection error: " + err.message,
        });
      }
      if (!results) {
        return res.status(404).json({
          status: "error",
          message: "Album not found",
        });
      }
      return res.status(200).json({
        status: "success",
        data: results,
      });
    });
  },

  updateAlbum: (req, res) => {
    const id = req.params.albumId;
    const body = req.body;
    body.user_id = req.user.user_id;
    const user_id = req.user.user_id;
   
    updateAlbums(id, body, (err, results) => {
      if (err) {
        if (!results || results.affectedRows === 0) {
          return res.status(404).json({
            status: "error",
            message: "No such album found or user does not have permission to update it.",
          });
        }else {
          return res.status(500).json({
            status: "error",
            message: "Database connection error: " + err.message,
          });
        }
      }
      return res.status(200).json({
        status: "success",
        data: results,
      });
    });
  },

   addPhotoToAlbum: (req, res) => {
    const userId = req.user.user_id;
    const albumId = req.params.albumId;
    const photoId = req.body.photo_id;

    addPhotoToAlbum(albumId, photoId, userId, (error) => {
      if (error) {
        if (error.message === "Album not found or not owned by the user") {
          return res.status(403).json({
            status: "error",
            message: "Unauthorized action or album not found.",
          });
        }
        return res.status(500).json({
          status: "error",
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        status: "success",
        data: null,
      });
    });
  },
};
