const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
}
let secret = '123abc'

let token = jwt.sign(data, secret);
console.log(token)

let decoded = jwt.verify(token, secret);
console.log('decoded: ', decoded)


// let message = 'I am user no 1'
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//     id: 4
// }

// let salt = 'somesecret'

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + salt).toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString()

// let resultHash = SHA256(JSON.stringify(token.data) + salt).toString()

// if(resultHash === token.hash) {
//     console.log('Data was not tampered.');
// } else {
//     console.log('Data was changed, do not trust');
// }