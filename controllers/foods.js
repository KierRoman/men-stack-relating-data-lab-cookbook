// controllers/foods.js
// /users/:userId/foods
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab

//INDEX
router.get('/', (req, res) => {
    User.findById(req.session.user)
        .then((user) => {
            if (!user) {
                return res.redirect('/')
            }
            res.render('foods/index.ejs', {
                user: req.session.user,
                pantryItems: user.pantry,
            });
        })
        .catch((err) => {
            console.log('Error fetching user on pantry items:', err)
            res.redirect('/')
        })
})


//NEW
router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
})


//DELETE
router.delete('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        user.pantry.id(req.params.itemId).deleteOne()
        await user.save()
        res.redirect(`/users/${user._id}/foods`)
    } catch (err) {
        console.log(err)
    }
})


//UPDATE


//CREATE
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        if (!user) {
            res.redirect('/')
        }
        user.pantry.push(req.body)
        await user.save()
        res.redirect(`/users/${user._id}/foods`)
    } catch {
        (err) => {
            console.log('Error fetching user on pantry items:', err)
            res.redirect('/')
        }
    }
})


//EDIT
router.get('/:itemId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const item = user.pantry.id(req.params.itemId)
        res.render('foods/edit.ejs', {
            pantryItems: item
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})



//SHOW
router.get('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const item = user.pantry.id(req.params.itemId)
        res.render('foods/show.ejs', {
            pantryItems: item,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
});


module.exports = router;
