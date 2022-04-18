const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('Get requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site under maintenance')
// })



//automatically parses req to json object
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

//start server
app.listen(port, () => {
    console.log('Server is running on port: '+port)
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('625d913cca8f6cdec9ec63c0')
//     // await task.populate('owner')
//     // console.log(task.owner)

//     const user = await User.findById('625d901154d9a02d4a5afe42')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main()