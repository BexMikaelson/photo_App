const {
    createPhoto,
    getPhotos,
    getPhotoByPhotoId,
    updatePhoto
} = require('./photos.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post("/", checkToken, createPhoto);
router.get("/", checkToken, getPhotos);
router.get("/:photoId", checkToken, getPhotoByPhotoId);
router.put("/:photoId", checkToken, updatePhoto);

module.exports = router;
