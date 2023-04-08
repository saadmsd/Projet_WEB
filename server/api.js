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
  // hash the password
  // bcrypt
  //   .hash(request.body.password, 10)
  //   .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        login: request.body.login,
        password: request.body.password,
        lastname: request.body.lastname,
        firstname: request.body.firstname,

      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  res.send("Serveur à l'écoute");	
})

module.exports = { router };
