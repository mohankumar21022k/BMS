const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user');
const User = require('../models/user')

//fetching all users
router.get('/users', userController.getUsers);



//signing Up
router.post('/user',
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

//getting a particular user
router.get('/user/:userId', userController.getUser);

//updating a particular user
router.put('/user/:userId',
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

//deleting a particular user
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;