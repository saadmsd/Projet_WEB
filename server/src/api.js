const express = require('express'); 
const Users = require('./entities/users.js');

function init(db){
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const users = new Users.default(db);

    router.post('/', (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        users.create(login, password, lastname, firstname)
            .then((result) => {
                res.status(201).json(result);
                res.end();
            })
            .catch((err) => {
                res.status(500).json(err);
                res.end();
            });
    });

    return router;
}

exports.default = init;
