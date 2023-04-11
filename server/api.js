const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbConnect = require("./db/dbConnect.js");

const User = require("./db/useModel.js");
const Commentaire = require("./db/comModel.js");
const FriendList = require("./db/friendListModel.js");

// execute database connection 
dbConnect();

const router = express.Router();

router.use(express.json());

// register endpoint
router.post("/user/", (request, response) => {
  // hash the password
   bcrypt
     .hash(request.body.password, 10)
     .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        login: request.body.login,
        password: hashedPassword,
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
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully", 
        e,
      });
    });
});


// login endpoint
router.post("/login/", (request, response) => {
  //check if the user exists
  User.findOne({login:request.body.login})
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((result) => {
          if(!result){
            return response.status(401).send({
              message: "Password is incorrect",
              error,
            });
          }
          const token = jwt.sign(
            {
              login: user.login,
              userId: user._id,
            },
            "Random-token",
            {expiresIn: "5sec",}
          );
          response.status(200).send({
            message: "Login successful",
            token,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Password is incorrect",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(500).send({
        message: "User not found",
        error,
      });
    });
});


router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) }).send();
});


//ajouter un commentaire
router.post('/commentaire/', (req, res) => {
  const commentaire = new Commentaire({
    //recuperer l'auteur = login de l'utilisateur
    auteur: req.body.auteur,
    texte: req.body.texte,
    date: req.body.date,
    nbLikes: req.body.nbLikes,
  });
  commentaire.save()
  .then((result) => {
    res.status(201).send({
      message: "Commentaire ajouté",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de l'ajout du commentaire",
      error,
    });
  });
});

//afficher tous les commentaires
router.get('/commentaire/', (req, res) => {
  Commentaire.find()
  .then((result) => {
    res.status(200).send({
      message: "Commentaires récupérés",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération des commentaires",
      error,
    });
  });
});

//recuperer l'id de l'utilisateur
router.get('/user/:login', (req, res) => {
  User.findOne({login: req.params.login})
  .then((result) => {
    res.status(200).send({
      message: "Id récupéré",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération de l'id",
      error,
    });
  });
});



router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  res.send("Serveur à l'écoute");	
})

module.exports = { router };
