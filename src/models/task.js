const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
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

}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task

// const newTask = new Task({
//     desc: '    4th Task   '
// })

// newTask.save().then((task) => {
//     console.log(task)
// }).catch((err) => {
//     console.log(err)
// })