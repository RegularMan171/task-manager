const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

//sign up
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

//login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCreds(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

//list of users
router.get('/users', auth , async (req, res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch(e) {
        res.status(500).send()
    }
})

//profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

const upload = multer ({
    dest:'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if(!file.originalname.match(/\.(PNG|jpg|jpeg)$/)) {
            return cb(new Error('please upload an image'))
        }
        cb(undefined, true)
    }

})
//upload profile pic
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

//logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

//delete all the login tokens
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth, async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates' })
    }

    try {

        //const user = await User.findById(req.params.id)
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(req.user)
    } catch(e) {
        res.status(400).send()
    }
})

//delete profile
router.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
})

//not to be used
router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch(e) {
        res.status(500).send(e)
    }
})

//not to be used
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(500).send(e)
    }

    // const id = new ObjectId(_id)

    // User.findById(id).then((user) => {
    //     console.log('user', user, id)
    //     if (!user) {
    //         return res.status(404).send()
    //     }
        
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

//not to be used
router.patch('/users/:id', async (req, res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates' })
    }

    try {

        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(400).send()
    }
})


module.exports = router