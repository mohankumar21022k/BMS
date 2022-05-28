const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user');
const auth = require('../middleware/authorize');

//fetching all users
router.get('/users', userController.getUsers);

//signing Up
router.post('/signup',
    [body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Weak Password!'),
    body('name')
        .trim()
        .isAlpha()
        .isLength({ min: 4 })
    ],
    userController.signUp);

//Login
router.post('/login', userController.login);

//getting a particular user
router.get('/user/:userId', userController.getUser);

//updating a particular user
router.put('/user/:userId', auth,
    [body('name')
        .trim()
        .isAlpha()
        .isLength({ min: 4 }),
    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Weak Password!'),
    body('role')
        .trim()
        .isAlpha()
        .isLength({ min: 4 }),
    ],
    userController.updateUser);

//fetching favs
router.get('/fav', auth, userController.getFav);

//posting favs
router.post('/fav/:bookId', auth, userController.postFav);

//deleting favs
router.post('/fav-delete/:bookId', auth, userController.postFavDeleteBook);

//deleting a particular user
router.delete('/user/:userId', auth, userController.deleteUser);

module.exports = router;