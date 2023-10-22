const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/signup'); 

const signupRouter = express.Router();

signupRouter.post('/signup', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        console.log('Received data:', req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

module.exports = signupRouter;







