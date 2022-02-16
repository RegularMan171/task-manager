const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = "mongodb://localhost:27017"
const dbName = 'task-manager'

const id = new ObjectID()
console.log(id, id.getTimestamp(), id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log(error)
    }

    const db = client.db(dbName)

    // db.collection('users').findOne({_id: new ObjectID("620ce309b36d3c1d65d1442d")}, (error, result) => {
    //     if(error) {
    //         return console.log(error)
    //     }
    //     return console.log(result)
    // })

    db.collection('users').find({ age: 23 }).toArray((error, users) => {
        if(error) {
            return console.log(error)
        }
        return console.log(users)
    })

    db.collection('users').find({age: 23}).count((error, count) => {
        console.log(count)
    })

    db.collection('movies').findOne({_id: new ObjectID("620ce096b8299f74c96a4abe")}, (error, movie) => {
        if(error) {

        }
        return console.log(movie)
    })

    db.collection('movies').find({ completed: true}).toArray((error, completedMovies) => {
        console.log(completedMovies)
    })
    
})