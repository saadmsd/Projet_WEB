const express = require("express");
const bcrypt = require("bcrypt");

const dbConnect = require("./db/dbConnect.js");

const User = require("./db/useModel.js");

// execute database connection 
dbConnect();

const router = express.Router();

router.use(express.json());

// register endpoint
router.post("/user/", (request, response) => {
  const user = new User({
    login: request.body.login,
    password: request.body.password,
    lastname: request.body.lastname,
    firstname: request.body.firstname,
  });
  user.save().then((result) => {
    response.status(201).send({
      message: "User Created Successfully",
      result,
    });
  })
  .catch((error) => {
    response.status(500).send({
      message: "Error creating user",
      error,
    });
  });
});

// router.post("/user/", (req, res) => {
//   const { login, password, lastname, firstname } = req.body;

//   res.status(200).send({message: "tout est bon"});

//   if (!login || !password || !lastname || !firstname) {
//     res.status(400).send("Missing fields");
//   } else {
//     try {
//       //const user_id = users.create(login, password, lastname, firstname);
//       res.status(201).send({ id: user_id });
//       console.log("Utilisateur créé");
//       res.send("Utilisateur créé");
//       res.end();
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   } 
// });

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  res.send("Serveur à l'écoute");	
})

module.exports = { router };
