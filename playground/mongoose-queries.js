const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user')

// let id = '5a9b23a5e966b7f0b237f255';
let userid = '5a9a6582b0ac46bd700b4d99';

if (!ObjectID.isValid(userid)){
    console.log('ID not valid');
}

User.findById(userid).then((user) => {
    if(!user) {
        return console.log('Unable to find user')
    }
    console.log(JSON.stringify(user, null, 2));
}).catch(e => console.log(e))


// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos ', todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo ', todo);
// })

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found')
//     }
//     console.log('Todo by id', todo);
// }).catch(e => console.log(e))