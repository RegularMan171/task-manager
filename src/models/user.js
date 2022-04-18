const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    //_id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value<0) {
                throw new Error('Age should not be negative')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length<6) {
                throw new Error('Password length should not be less than 6')
            }
            if(value.toLowerCase().includes('password')) {
                throw new Error('Choose another password')
            }
        }
    }
})

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User


//defining a model

// creating an instance of the model
// const me = new User({
//     name: 'Mike',
//     email: 'mike@email.com',
//     password: 'passworD '
// })

// //returns a promise
// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })