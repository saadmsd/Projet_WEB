const express = require("express");
const Users = require("./entities/users.js");

const router = express.Router();

// Use JSON
//router.use(express.json());

// Simple logger for this router's requests
// All requests to this router will first hit this middleware
// router.use((req, res, next) => {
//   console.log('API: method %s, path %s', req.method, req.path);
//   console.log('Body', req.body);
//   next();
// });

const users = new Users.default("mongodb://localhost:27017/");

router.use(express.json());

router.post("/user/", (req, res) => {
  const { login, password, lastname, firstname } = req.body;

  res.status(200).send({message: "tout est bon"});

  /* if (!login || !password || !lastname || !firstname) {
    res.status(400).send("Missing fields");
  } else {
    try {
      const user_id = users.create(login, password, lastname, firstname);
      res.status(201).send({ id: user_id });
      console.log("Utilisateur créé");
      res.send("Utilisateur créé");
      res.end();
    } catch (err) {
      res.status(500).send(err);
    }
  } */
});

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  res.send("Serveur à l'écoute");	
})

module.exports = { router };
