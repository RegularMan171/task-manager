const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    desc: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    },

})

// const newTask = new Task({
//     desc: '    4th Task   '
// })

// newTask.save().then((task) => {
//     console.log(task)
// }).catch((err) => {
//     console.log(err)
// })