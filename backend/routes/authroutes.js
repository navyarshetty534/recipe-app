// Registration route
const express = require('express');
const router = express.Router();
const mongoose=require ('mongoose');
const app=express.app();

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.send('Registered successfully');
    } catch (error) {
        res.status(400).send('Error registering');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.send('Logged in');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(400).send('Error logging in');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});


module.exports = router;

