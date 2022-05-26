const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//Fetching Users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: 'Fetched Users Successfully!!',
            users: users
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//User signUp
exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({message :errors.array()[0].msg})
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const exUser = await User.findOne({ email: email });
        if (exUser) {
            return res.status(200).json({ message: 'User with this email-id exists. Take Please try with different email-id' })
        }

        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            name: name,
            email: email,
            password: hashedPw,
            role: 'user',
            userAccess: true,
            fav: { books: [] }
        });
        await user.save();
        res.status(201).json({
            message: 'User created successfully!',
        });

    }

    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

//Fetching a single user
exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('Could not find User.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'User fetched.', user: user });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Updating the user
exports.updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({message :errors.array()[0].msg})
    }
    const userId = req.params.userId;
    const name = req.body.name
    const password = req.body.password;
    const role = req.body.role;
    const userAccess = req.body.userAccess
    const fav = req.body.fav
    try {

        const hashedPw = await bcrypt.hash(password, 12);
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('Could not find User.');
            error.statusCode = 404;
            throw error;
        }
        user.name = name;
        user.email = email;
        user.password = hashedPw;
        user.role = role;
        user.userAccess = userAccess;
        user.fav = fav;
        const result = await user.save();
        res.status(200).json({ message: 'User Info updated!', user: result });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//User Deleting
exports.deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByIdAndRemove(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found ' });
        }
        res.status(201).json({ message: "User deleted successfully", name: user.userName });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}
