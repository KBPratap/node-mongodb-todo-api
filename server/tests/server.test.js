const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');

const {
    todos,
    populateTodos,
    users,
    populateUsers
} = require('./seed/seed');



beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e))
            })
    })

    it('Should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e) => done(e))
            })
    })
})

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3)
            })
            .end(done)
    })
});

describe('GET /todos/:id', () => {
    it('should return todo with given id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })

    it('should return a 404, if todo is not found', (done) => {
        request(app)
            .get(`/todos/${(new ObjectID()).toHexString()}`)
            .expect(404)
            .end(done)
    })

    it('should return a 404, for invalid ObjectID', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done)
    })
})


describe('DELETE /todos/:id', () => {
    it('should delete and return todo with given id', (done) => {
        let hexId = todos[0]._id.toHexString()
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                // console.log('response: ', res)
                expect(res.body.todo._id).toBe(hexId)
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.findById(hexId).then(todo => {
                    // console.log('new response: ', todo)
                    expect(todo).toBe(null)//.toNotExist();
                    done();
                }).catch(e => done(e));
                
            })
    })

    it('should return a 404, if todo doesn\'t exist', (done) => {
        request(app)
            .delete(`/todos/${(new ObjectID()).toHexString()}`)
            .expect(404)
            .end(done)
    })

    it('should return a 404, for invalid ObjectID', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done)
    })
})

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        let hexId = todos[0]._id.toHexString()
        let text = 'this should be the new text'

        // Todo.findByIdAndUpdate(hexId, {$set: {completed: false}})

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed:false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(false)
                expect(res.body.todo.completedAt).toBe(null)
            })
            .end(done);
        
    })

    it('should clear completedAt, when todo is not completed', (done) => {
        let hexId = todos[1]._id.toHexString()
        let text = 'this should be the new text for 2nd todo'

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed:true,
                completedAt: 333,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(true)
                expect(res.body.todo.completedAt).toBeDefined()
            })
            .end(done);
    })
})

describe('GET /users/me', () => {
    it('should return user, if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done)
    })

    it('should return 401, if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done)
    })
})

describe('POST /users', () => {
    it('should create a user', (done) => {
        let email = 'test@example.com';
        let password = 'abc123!'

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeDefined();
                expect(res.body._id).toBeDefined();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if(err) {
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toBeDefined();
                    expect(user.password).not.toBe(password);
                    done();
                });
            })
    });

    it('should return validations errors, if request is invalid', (done) => {
        let email = 'example.com';
        let password = 'abc1'

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    })

    it('should not create a user, if email is already in use', (done) => {
        let email = users[0].email;
        let password = 'abc123!'

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    })
})

describe('POST /users/login', () => {
    it('should login user and return auth-token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[0].email, //'kbpratap@gmail.com',
                password: users[0].password //'user1Pass',
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeDefined();
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                User.findById(users[0]._id).then((user) => {
                    let token = user.tokens[0]
                    console.log(token.token)
                    expect(token).toHaveProperty('access', 'auth');
                    // expect(token).toHaveProperty('token', res.headers['x-auth']);
                    expect(token).toHaveProperty('token');
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[0].email, 
                password: users[0].password + 1
            })
            .expect(400)
            .end(done)
    });
})