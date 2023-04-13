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
  //recuperer l'id du dernier commentaire de la base de données et l'incrementer de 1 pour le nouveau commentaire
  Commentaire.find().sort({id:-1}).limit(1)
  .then((result) => {
    if (result.length === 0) {
      var iid = 1;
    } else {
      var iid = result[0].id + 1;
    }
    //creer un nouveau commentaire
    const commentaire = new Commentaire({
      id: iid,
      auteur: req.body.auteur,
      texte : req.body.texte,
      date: req.body.date,
      nbLike: req.body.nbLike,
    });
  //sauvegarder le nouveau commentaire dans la base de données
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
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération du dernier commentaire",
      error,
    });
  });
});



//afficher tous les commentaires
router.get('/commentaire/', (req, res) => {
  //recuperer tous les commentaire de la base de données et les envoyer au front dans le sens inverse de l'ordre de création
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

//recuperer le nom et prenom de l'utilisateur par son login
router.get('/user/:login', (req, res) => {
  User.findOne({login:req.params.login})
  .then((result) => {
    res.status(200).send({
      message: "Utilisateur récupéré",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération de l'utilisateur",
      error,
    });
  });
});

// Liker un commentaire en fonction de son id
router.put('/commentaire/:id', (req, res) => {
  Commentaire.findOne({id:req.params.id})
  .then((result) => {
    //incrementer le nombre de like du commentaire
    result.nbLike = result.nbLike + 1;
    //ajouter le login de l'utilisateur qui a liké le commentaire dans le tableau des utilisateurs qui ont liké le commentaire
    result.likedBy.push(req.body.auteur);
    //sauvegarder le commentaire modifié dans la base de données
    result.save()
    .then((result) => {
      res.status(200).send({
        message: "Commentaire liké",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Erreur lors du like du commentaire",
        error,
      });
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération du commentaire",
      error,
    });
  });
});





router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  res.send("Serveur à l'écoute");	
})

module.exports = { router };
