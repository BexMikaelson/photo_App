const { 
    createUser, 
    getUserByUserId, 
    getUsers, 
    login 
} = require('/Applications/MAMP/htdocs/photo_App/api/users/user.controller.js');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/', createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserByUserId);
router.post('/login', login);


module.exports = router;