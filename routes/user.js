const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.get('/', async (req, res) => {
  
    const myUser = await User.find();

    res.send(result)
});


router.post('/', async (req, res) => {

    const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });

    await user.save();
    
    res.send(user);
})


module.exports = router;