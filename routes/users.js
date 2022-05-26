const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

//fetching all users
router.get('/users', userController.getUsers);

//signing Up
router.post('/user', userController.signUp);

//getting a particular user
router.get('/user/:userId', userController.getUser);

//updating a particular user
router.put('/user/:userId', userController.updateUser);

//deleting a particular user
router.delete('/user/:userId', userController.deleteUser);

module.exports = router;