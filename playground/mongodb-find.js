// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp'

let obj = new ObjectID();
console.log(obj)

MongoClient.connect(url, (err, client) => {
    if(err) {
        return console.error('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp')

    // db.collection('Todos')
    //     .find({
    //         _id: new ObjectID("5a8b1db911f120d40bcf3798")
    //         // _id: "5a8b1db911f120d40bcf3798"
    //     })
    //     .toArray()
    //     .then((docs)=>{
    //         console.log('Todos')
    //         console.log(JSON.stringify(docs, null, 2))
    //     }, (err) => {
    //         console.log('Unable to fetch todos', err);
    //     });

    // db.collection('Todos')
    //     .find()
    //     .count()
    //     .then((count)=>{
    //         console.log(`Todos count: ${count}`)
    //     }, (err) => {
    //         console.log('Unable to fetch todos count', err);
    //     });

    db.collection('Users')
        .find({name: 'Bhanu'})
        .toArray()
        .then((docs)=>{
            console.log(JSON.stringify(docs, null, 2))
        }, (err) => {
            console.log('Unable to fetch todos count', err);
        });

    // client.close();
});