const { 
    createUser, 
    getUserByUserId, 
    getUsers, 
    login 
} = require('./user.controller');

const router = require('express').Router();

router.post('/register', createUser);
router.get('/', getUsers);
router.get('/:id', getUserByUserId);
router.post('/login', login);

module.exports = router;