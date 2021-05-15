const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: authConfig.expires });
}

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {

        if (await User.findOne({ email })) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        const token = generateToken({ id: user.id, userName: user.name });

        res.send({ user, token });
    } catch (err) {
        return res.status(400).json({ error: 'Registration failed' });
   }
});

router.post('/authenticate', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: 'Invalid password' });
    }

    user.password = undefined;

    const token = generateToken({ id: user.id, userName: user.name });    

    return res.status(200).json({ user, token });

});


router.post('/authenticate', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: 'Invalid password' });
    }

    user.password = undefined;

    const token = generateToken({ id: user.id, userName: user.name });    

    return res.status(200).json({ user, token });

});




module.exports = app => app.use('/auth', router);