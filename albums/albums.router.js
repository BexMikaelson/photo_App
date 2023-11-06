const {
  getAlbums,
  getAlbumByAlbumId,
  createAlbum,
  updateAlbum,
  addPhotoToAlbum,
} = require("./albums.controller");

const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.get("/", checkToken, getAlbums);
router.get("/", checkToken, getAlbums);
router.get("/:albumId", checkToken, getAlbumByAlbumId);
router.post("/", checkToken, createAlbum);
router.put("/:albumId", checkToken, updateAlbum);
router.post("/:albumId/photos", checkToken, addPhotoToAlbum);

module.exports = router;
