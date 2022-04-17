require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('625bbce17ab187e3dc2f2f75').then((result) => {
//     console.log('deleted task:\n',result,'\n')
//     return Task.countDocuments({ completed: false})
// }).then((inc_tasks) => {
//     console.log(inc_tasks)
// }).catch((e) => {
//     console.log(e)
// })

const delRec = async (id) => {
    const user = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

delRec('625bd67df92462636b1b1be3').then((count) => {
    console.log(count)
})