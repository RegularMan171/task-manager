const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
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