const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

let user1ID = new ObjectID()
let user2ID = new ObjectID()

const users = [
    {
        _id: user1ID,
        email: 'kbpratap@gmail.com',
        password: 'user1Pass',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ 
                _id: user1ID, 
                access: 'auth' 
            }, 'abc123').toString()
        }]
    },
    {
        _id: user2ID,
        email: 'kbpratap@hotmail.com',
        password: 'user2Pass',    
    }
]

const populateUsers = (done) => {
    User.remove().then(() => {
        let user1 = new User(users[0]).save();
        let user2 = new User(users[1]).save();

        return Promise.all([user1, user2]);
    }).then(() => done());
}

const todos = [
    { 
        _id: new ObjectID(), 
        text: 'first test todo',
        completed: true,
        completedAt:333
    },
    {  
        _id: new ObjectID(), 
        text: 'second test todo'
    },
    {  
        _id: new ObjectID(), 
        text: 'third test todo'
    }
]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}



module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}