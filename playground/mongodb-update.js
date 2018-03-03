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
    
    db.collection('Todos')
        .findOneAndUpdate({
            text: "Make dinner"
        }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        })
        .then((result)=>{
            console.log(JSON.stringify(result, null, 2))
        }, (err) => {
            console.log('Unable to delete user', err);
        });

    
    

    // client.close();
});