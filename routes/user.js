const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();


router.get('/', async (req, res) => {
  
    const myUser = await User.find();

    res.send(result)
});


router.post('/register', async (req, res) => {

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, 'mySecretKey');

    res.send({ token });
})


router.post('/login', async (req, res) => {
    
    const user = await User.findOne({ email: req.body.email, password: req.body.password})
                        .select('-password');

    if(user) {
        res.status(200).send(user);
    }
    else{
        res.status(400).send('email or password not found ...');
    }
});


module.exports = router;