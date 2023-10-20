const {
  createPhoto,
  getPhotos,
  getPhotoByPhotoId,
  updatePhoto,
} = require("./photos.service");

module.exports = {
  createPhoto: (req, res) => {
    const body = req.body;
    body.user_id = req.user.user_id;
    createPhoto(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "error",
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        status: "success",
        data: results,
      });
    });
  },
  getPhotos: (req, res) => {
    getPhotos((err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        status: "success",
        data: results,
      });
    });
  },
  getPhotoByPhotoId: (req, res) => {
    const id = req.params.photoId;
    getPhotoByPhotoId(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Database connection error",
        });
      }
      if (!results) {
        return res.status(404).json({
          status: "error",
          message: "Record not found",
        });
      }
      return res.status(200).json({
        status: "success",
        data: results,
      });
    });
  },
  updatePhoto: (req, res) => {
    const id = req.params.photoId;
    const body = req.body;
    body.user_id = req.user.user_id;
    updatePhoto(body, id, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        status: "success",
        data: results,
      });
    });
  },
};
