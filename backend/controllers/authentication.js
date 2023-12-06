const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    } else {
        res.json({ user })
    }
})

router.get('/profile', async (req, res) => {

    // *** GOOD way to handle when a user is authorized and when they are not. *** //
    try {
        let user = await User.findOne({
            where: { userId: req.body.email }
        })
            res.json(user)
    } catch (err) {
        console.log(err)
        res.json(null)
    }
})

module.exports = router