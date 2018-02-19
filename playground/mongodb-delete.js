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
    
    // deleteMany
    // db.collection('Todos')
    //     .deleteMany({text: 'Make dinner'})
    //     .then((result)=>{
    //         console.log(JSON.stringify(result, null, 2))
    //     }, (err) => {
    //         console.log('Unable to delete todos count', err);
    //     });
    
    // deleteOne
    // db.collection('Todos')
    //     .deleteOne({text: 'Make dinner'})
    //     .then((result)=>{
    //         console.log(JSON.stringify(result, null, 2))
    //     }, (err) => {
    //         console.log('Unable to delete todos count', err);
    //     });

    // findOneAndDelete
    // db.collection('Todos')
    //     .findOneAndDelete({completed: false})
    //     .then((result)=>{
    //         console.log(JSON.stringify(result, null, 2))
    //     }, (err) => {
    //         console.log('Unable to delete todos count', err);
    //     });

    // db.collection('Users')
    //     .findOneAndDelete({
    //         _id: new ObjectID("5a8b208362e977da5780082d")
    //     })
    //     .then((result)=>{
    //         console.log(JSON.stringify(result, null, 2))
    //     }, (err) => {
    //         console.log('Unable to delete user', err);
    //     });

    db.collection('Users')
        .deleteMany({name: "Bhanu Karumuri"})
        .then((result)=>{
            console.log(JSON.stringify(result, null, 2))
        }, (err) => {
            console.log('Unable to delete user', err);
        });
    

    // client.close();
});