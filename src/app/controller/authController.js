const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const fieldsValidation = require('../helpers/fieldsValidation');
const STRINGS = require('../../config/strings');


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: authConfig.expires });
}

router.post('/register', async (req, res) => {    
        
    const { name, email, password } = req.body;
    
    const isNameValid = fieldsValidation.validateName(name);
    const isEmailValid = fieldsValidation.validateEmail(email);
    const isPasswordValid = fieldsValidation.validatePassword(password);

    //name validation
    if (isNameValid.isEmpty) {
        return res.status(400).json(STRINGS.NAME_EMPTY);
    }

    if (isNameValid.isInvalidLength) {
        return res.status(400).json(STRINGS.NAME_TO_SHORT);
    }

    if (isNameValid.isIncorrect) {
        return res.status(400).json(STRINGS.NAME_FORMAT);
    }

    // email validation
    if (isEmailValid.isEmpty) {
        return res.status(400).json(STRINGS.EMAIL_EMPTY);
    }
    
    if (isEmailValid.isIncorrect) {
        return res.status(400).json(STRINGS.EMAIL_FORMAT);
    }

    // password validation
    if (isPasswordValid.isEmpty) {
        return res.status(400).json(STRINGS.PASSWORD_EMPTY);
    }

    if (isPasswordValid.isInvalidLength) {
        return res.status(400).json(STRINGS.PASSWORD_TO_SHORT);
    }

    if (isPasswordValid.isIncorrect) {
        return res.status(400).json(STRINGS.PASSWORD_SPECIAL_CHARS);
    }    

    // try to save new user
    try {

        if (await User.findOne({ email })) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const params = {
            name,
            email,
            password
        };

        const user = await User.create(params);
        
        const token = generateToken({ id: user.id, userName: user.name });

        const userData = {
            name: user.name,
            email: user.email,
            token: token
        };

        res.status(200).json(userData);
        
    } catch (err) {
        return res.status(400).json({ error: 'Registration failed' });
   }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    
    const isEmailValid = fieldsValidation.validateEmail(email);
    const isPasswordValid = fieldsValidation.validatePassword(password);
    
    // email validation
    if (isEmailValid.isEmpty) {
        return res.status(400).json(STRINGS.EMAIL_EMPTY);
    }
    
    if (isEmailValid.isIncorrect) {
        return res.status(400).json(STRINGS.EMAIL_FORMAT);
    }

    // password validation
    if (isPasswordValid.isEmpty) {
        return res.status(400).json(STRINGS.PASSWORD_EMPTY);
    }

    if (isPasswordValid.isInvalidLength) {
        return res.status(400).json(STRINGS.PASSWORD_TO_SHORT);
    }

    if (isPasswordValid.isIncorrect) {
        return res.status(400).json(STRINGS.PASSWORD_SPECIAL_CHARS);
    }
    
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).json(STRINGS.USER_NOT_FOUND);
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json(STRINGS.USER_INVALID_PASSWORD);
    }

    const token = generateToken({ id: user.id, userName: user.name });
    
    const userData = {
        name: user.name,
        token: token
    }

    return res.status(200).json(userData);

});

module.exports = app => app.use('/auth', router);