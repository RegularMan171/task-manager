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