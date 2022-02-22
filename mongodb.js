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

    // db.collection('users').updateOne({
    //     _id: new ObjectID("620cdcb13892d9265148a9ab"),
    // }, {
    //     $set: {
    //         name: 'Name 3'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID("620cdcb13892d9265148a9ab"),
    // }, {
    //     $inc: {
    //         age: 10
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })

    db.collection('movies').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })

    // db.collection('users').deleteMany({
    //     age: 8
    // }).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })

    db.collection('users').deleteOne({
        _id: new ObjectID("620a8bb5422fa3ac19867dcd")
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
    

})