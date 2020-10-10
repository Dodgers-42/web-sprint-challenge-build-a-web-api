const express = require('express');
const db = require('./database');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: 'Testing to see if it works'})
})

server.listen(8080, () => {
    console.log('server started')
});