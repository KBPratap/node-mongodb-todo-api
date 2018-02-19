// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(url, (err, client) => {
    if(err) {
        return console.error('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Complete nodeJS course',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.error('Unable to insert Todo', err)
    //     }

    //     console.log(JSON.stringify(result.ops, null, 2))

    // })

    // db.collection('Users').insertOne({
    //     name: 'Bhanu Karumuri',
    //     age: 33,
    //     location: 'CA'
    // }, (err, result) => {
    //     if(err) {
    //         return console.error('Unable to insert Todo', err)
    //     }

    //     // console.log(JSON.stringify(result.ops, null, 2))
    //     console.log(result.ops[0]._id)
    //     console.log(result.ops[0]._id.getTimestamp())

    // })



    client.close();
});