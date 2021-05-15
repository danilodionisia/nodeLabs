const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {

        if (await User.findOne({ email })) {
            res.status(400).json({ error: 'User already exists' });
        }

        const user = await User.create(req.body);
        user.password = undefined;

        res.send({ user });
    } catch (err) {
        res.status(400).json({ error: 'Registration failed' });
   }
});

module.exports = app => app.use('/auth', router);