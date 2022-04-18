const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    //_id: { type: mongoose.Schema.Types.ObjectId },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

})

module.exports = Task

// const newTask = new Task({
//     desc: '    4th Task   '
// })

// newTask.save().then((task) => {
//     console.log(task)
// }).catch((err) => {
//     console.log(err)
// })