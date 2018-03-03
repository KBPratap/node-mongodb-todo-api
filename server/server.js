const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    let todo = new Todo({
        text: req.body.text
    })
    todo.save().then(
        (doc) => { 
            res.send(doc) 
        },
        (e) => {
            res.status(400).send(e) 
        }
    )
});

app.get('/todos', (req, res) => {
    Todo.find().then(
        (todos) => {
            res.send({todos});
        }, 
        (e) => {
            res.status(400).send(e);
        }
    )
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // console.log(req.params)
    Todo.findById(id).then(
        (todo) => {
            if(!todo){
                return res.status(404).send()
            }
            return res.send({todo});
        }, 
        (e) => {
            res.status(400).send();
        }
    )
})

app.listen(3000, () => {
    console.log('Started on port 3000');
})

module.exports = {
    app
}

// let user = new User({
//     email: 'emp1@gdev.com'
// })

// user.save().then((doc) => {
//     console.log('Saved user', doc)
// }, (e) => {
//     console.log('Couldn\'t save user');
// })

// let newTodo = new Todo({
//     text: 'Go shopping'
// })

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save Todo')
// });
