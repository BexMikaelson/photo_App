const { 
    getAlbums, 
    getAlbumByAlbumId, 
    createAlbum,
    updateAlbum,
    addPhotoToAlbum
} = require('/Applications/MAMP/htdocs/photo_App/api/albums/albums.controller.js');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get('/',checkToken, getAlbums);
router.get('/:albumId',checkToken, getAlbumByAlbumId);
router.post('/',checkToken, createAlbum);
router.put('/:albumId',checkToken, updateAlbum);
router.post('/:albumId/photos',checkToken, addPhotoToAlbum);

module.exports = router;
