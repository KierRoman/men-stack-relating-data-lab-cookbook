const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//INDEX
router.get('/', async (req, res) => {
    const user =  await User.find()
    res.render('users/index.ejs', {
        user: user
    })
})



//SHOW
router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId)
    const pantry = user.pantry
    res.render('users/show.ejs', {
        user: user,
        pantry: pantry
    })
})




module.exports = router;