const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const ObjectId = require('mongodb').ObjectId
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//automatically parses req to json object
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

//start server
app.listen(port, () => {
    console.log('Server is running on port: '+port)
})
