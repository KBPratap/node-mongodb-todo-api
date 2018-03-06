const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user')

// Todo.remove({}).then(result => {
//     console.log(result);
// })

// Todo.findOneAndRemove().then(todo => {
//     console.log(todo);
// })

Todo.findByIdAndRemove("5a9e5d03e9caef3d0b8ebf9a").then(todo => {
    console.log(todo);
})