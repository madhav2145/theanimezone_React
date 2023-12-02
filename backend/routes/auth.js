const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.hash, salt);

        const user = new User({
            username: req.body.username,
            hash: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        });

        const savedUser = await user.save();

        // Generate token for the new user
        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);

        // Include the token and user data in the response
        res.status(201).json({ token, user: { _id: savedUser._id, username: savedUser.username, firstName: savedUser.firstName, lastName: savedUser.lastName, email: savedUser.email } });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error during registration' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ registered: false });

        const validPass = await bcrypt.compare(req.body.password, user.hash);
        if (!validPass) return res.status(400).json({ password: false });

        // Create token and add it to the header
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-header', token);

        // Optionally, you can include user data in the response
        res.json({ success: true, message: 'Logged in', user: { _id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error during login' });
    }
});

module.exports = router;
