const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbConnect = require("./db/dbConnect.js");

const User = require("./db/useModel.js");
const Commentaire = require("./db/comModel.js");
const Reponse = require("./db/repModel.js");

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
            message: error.message || "Some error occurred while creating the user.",
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
              message: "Votre mot de passe est incorrect",
              error,
            });
          }
          const token = jwt.sign(
            {
              login: user.login,
              userId: user._id,
            },
            "Random-token",
            {expiresIn: "24h"}
          );
          response.status(200).send({
            message: "Login successful",
            token,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Votre mot de passe est incorrect",
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

// logout endpoint
router.get("/logout/", (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).send({
    message: "Logout successful",
  });
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
  //recuperer tous les commentaire et les reponses de la base de données et les envoyer au front dans le sens inverse de l'ordre de création
  Commentaire.find().sort({id:-1})
  .then((result) => {
    Reponse.find().sort({id:-1})
    .then((result2) => {
      res.status(200).send({
        message: "Commentaires récupérés",
        result,
        result2,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Erreur lors de la récupération des réponses",
        error,
      });
    });
  }
  )
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération des commentaires",
      error,
    });
  }
  );
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
router.put('/commentaire/like/:id', (req, res) => {
  Commentaire.findOne({_id:req.params.id})
  .then((result) => {
    if (result.likedBy.includes(req.body.auteur)) {
      //decrementer le nombre de like du commentaire
      result.nbLike = result.nbLike - 1;
      //supprimer le login de l'utilisateur qui a liké le commentaire dans le tableau des utilisateurs qui ont liké le commentaire
      result.likedBy.pull(req.body.auteur);
      //sauvegarder le commentaire modifié dans la base de données
      result.save()
      return res.status(200).send({
        message: "Commentaire unliké",
        result,
        like: false,
      });
    }
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
        like: true,
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

//ajouter une reponse a un commentaire
router.post('/commentaire/reponse/:id', (req, res) => {
  Commentaire.findOne({id:req.params.id})
  .then((result) => {
    //creer une nouvelle reponse
    const reponse = new Reponse({
      auteur: req.body.auteur,
      texte : req.body.texte,
      date: req.body.date,
      nbLike: req.body.nbLike,
      parentId: req.params.id,
    });
    //sauvegarder la reponse dans la base de données
    reponse.save()
    .then((result) => {
      res.status(201).send({
        message: "Reponse ajoutée",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Erreur lors de l'ajout de la reponse",
        error,
      });
    });
  })
  .catch((error) => {
    res.status(501).send({
      message: "Erreur lors de la récupération du commentaire",
      error,
    });
  });
});

//afficher toutes les reponses d'un commentaire
router.get('/commentaire/reponse/:id', (req, res) => {
  Reponse.find({parentId:req.params.id})
  .then((result) => {
    res.status(200).send({
      message: "Reponses récupérées",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération des reponses",
      error,
    });
  });
});

// Liker une reponse en fonction de son id
router.put('/commentaire/reponse/like/:id', (req, res) => {
  Reponse.findOne({_id:req.params.id})
  .then((result) => {
    if (result.likedBy.includes(req.body.auteur)) {
      //decrementer le nombre de like du commentaire
      result.nbLike = result.nbLike - 1;
      //supprimer le login de l'utilisateur qui a liké le commentaire dans le tableau des utilisateurs qui ont liké le commentaire
      result.likedBy.pull(req.body.auteur);
      //sauvegarder le commentaire modifié dans la base de données
      result.save()
      return res.status(200).send({
        message: "Réponse unlikée",
        result,
        like: false,
      });
    }
    //incrementer le nombre de like de la reponse
    result.nbLike = result.nbLike + 1;
    //ajouter le login de l'utilisateur qui a liké la reponse dans le tableau des utilisateurs qui ont liké la reponse
    result.likedBy.push(req.body.auteur);
    //sauvegarder la reponse modifiée dans la base de données
    result.save()
    .then((result) => {
      res.status(200).send({
        message: "Reponse likée",
        result,
        like: true,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Erreur lors du like de la reponse",
        error,
      });
    });
  })

  .catch((error) => {
    res.status(501).send({
      message: "Erreur lors de la récupération de la reponse",
      error,
    });
  });
});

//Supprimer un commentaire 
router.delete('/commentaire/:id', (req, res) => {
  Commentaire.findOneAndDelete({_id:req.params.id})
  .then((result) => {
    res.status(200).send({
      message: "Commentaire supprimé",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la suppression du commentaire",
      error,
    });
  });
});

//Supprimer un commentaire apres ratio
router.delete('/commentaire/ratio/:id', (req, res) => {
  Commentaire.findOneAndDelete({_id:req.params.id})
  .then((result) => {
    res.status(200).send({
      message: "Commentaire supprimé",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la suppression du commentaire",
      error,
    });
  });
});


//Supprimer les reponse en fonction du commentaire parent
router.delete('/commentaire/reponses/:id', (req, res) => {
  Reponse.deleteMany({parentId:req.params.id})
  .then((result) => {
    res.status(200).send({
      message: "Reponses supprimées",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la suppression des reponses",
      error,
    });
  });
});


//supprimer une reponse en fonction de son id
router.delete('/commentaire/reponse/:id', (req, res) => {
  Reponse.findOneAndDelete({_id:req.params.id})
  .then((result) => {
    res.status(200).send({
      message: "Reponse supprimée",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la suppression de la reponse",
      error,
    });
  });
});




// Retourne la liste des utilisateurs contenant les caractere de la requete dans leur login
router.get('/search', (req, res) => {
  User.find({login: new RegExp(req.query.login, 'i')})
  .then((result) => {
    console.log(req.query.login) 
    res.status(200).send({
      message: "Utilisateurs récupérés",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération des utilisateurs",
      error,
    });
  });
});

//retourne le nombre de like d'un commentaire
router.get('/commentaire/like/:id', (req, res) => {
  Commentaire.findOne({_id:req.params.id})
  .then((result) => {
    res.status(200).send({
      message: "Nombre de like récupéré",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération du nombre de like",
      error,
    });
  });
});

//retourne le nombre de like d'une reponse
router.get('/commentaire/reponse/like/:id', (req, res) => {
  Reponse.findOne({_id:req.params.id})
  .then((result) => {
    res.status(200).send({
      message: "Nombre de like récupéré",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération du nombre de like",
      error,
    });
  });
});


  
  
// Récupérer la liste des utilisateurs suivis
router.get("/user/:username/following", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ login: username }).populate("following");
    res.status(200).send({
      message: "Liste des utilisateurs suivis récupérée avec succès",
      following: user.following,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
});

// Récupérer la liste des abonnés
router.get("/user/:username/followers", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ login: username }).populate("followers");
    res.status(200).send({
      message: "Liste des abonnés récupérée avec succès",
      followers: user.followers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
});

// Gérer les actions de suivi et de désabonnement
router.put("/user/:username/follow", async (req, res) => {
  try {
    const { username } = req.params;
    const { user } = req.body;

    // Vérifier si l'utilisateur à suivre existe
    const userToFollow = await User.findOne({ login: user });
    if (!userToFollow) {
      return res.status(404).send("Utilisateur introuvable");
    }

    // Bascule de l'état de suivi
    const isFollowing = userToFollow.followers.includes(username);
    if (isFollowing) {
      await User.updateOne({ login: username }, { $pull: { following: userToFollow.login } });
      await User.updateOne({ login: userToFollow.login }, { $pull: { followers: username } });
    } else {
      await User.updateOne({ login: username }, { $push: { following: userToFollow.login } });
      await User.updateOne({ login: userToFollow.login }, { $push: { followers: username } });
    }

    res.status(200).send("Action de suivi effectuée avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur interne du serveur");
  }
});


//ratio : incremente le cptRatioed de l'auteur du commentaire
router.put('/commentaire/ratioed/:login', (req, res) => {
  console.log("ratioed" + req.params.login)
  User.findOne({login:req.params.login})
  .then((result) => {
    if (!result) {
      return res.status(404).send({
        message: "Utilisateur non trouvé",
      });
    }
    result.cptRatioed = result.cptRatioed + 1;
    result.save();
    console.log(result)
    res.status(200).send({
      message: "Ratio incrémenté",
      result,
    });
  })
  .catch((error) => {
    res.status(502).send({
      message: "Erreur lors de l'incrémentation du ratio",
      error,
    });
  });
});


router.put('/commentaire/reponse/ratio/:login', (req, res) => {
  console.log("ratioed" + req.params.login)
  User.findOne({login:req.params.login})
  .then((result) => {
    if (!result) {
      return res.status(404).send({
        message: "Utilisateur non trouvé",
      });
    }
    result.cptRatio = result.cptRatio + 1;
    result.save();
    console.log(result)
    res.status(200).send({
      message: "Ratio incrémenté",
      result,
    });
  })
  .catch((error) => {
    res.status(502).send({
      message: "Erreur lors de l'incrémentation du ratio",
      error,
    });
  });
});


router.put('/incrementRatio/:idCommentaire/:idReponse', async (req, res) => {
  const idCommentaire = req.params.idCommentaire;
  const idReponse = req.params.idReponse;

  try {
    const commentaire = await Commentaire.findOne({ id: idCommentaire });
    const userAuteurReponse = await User.findOne({ login: commentaire.auteur });
    const userAuteurCommentaire = await User.findOne({ login: userAuteurReponse.cptRatioed });

    userAuteurReponse.cptRatio++;
    await userAuteurReponse.save();

    userAuteurCommentaire.cptRatioed++;
    await userAuteurCommentaire.save();

    res.status(200).json({ message: 'Ratio incremented successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//retourne la liste des utilisateurs qui ont le plus de cptRatioed 
router.get('/user/stats/ratioed', (req, res) => {
  User.find().sort({cptRatioed:-1}).limit(10)
  .then((result) => {
    res.status(200).send({
      message: "Liste des utilisateurs qui ont le plus de cptRatioed récupérée",
      result,
    });
    console.log(result)
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération de la liste des utilisateurs qui ont le plus de cptRatioed",
      error,
    });
  });
});

//retourne la liste des utilisateurs qui ont le plus de cptRatio
router.get('/user/stats/ratio', (req, res) => {
  User.find().sort({cptRatio:-1}).limit(5)
  .then((result) => {
    res.status(200).send({
      message: "Liste des utilisateurs qui ont le plus de cptRatio récupérée",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération de la liste des utilisateurs qui ont le plus de cptRatio",
      error,
    });
  });
});

//retourne le cptRatioed et cptRatio d'un utilisateur
router.get('/user/stats/:login', (req, res) => {
  User.findOne({login:req.params.login})
  .then((result) => {
    res.status(200).send({
      message: "cptRatioed et cptRatio récupérés",
      result,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Erreur lors de la récupération de cptRatioed et cptRatio",
      error,
    });
  });
});

//Recupere les commentaires d'un utilisateur
router.get('/user/comments/:login', (req, res) => {
  Commentaire.find({auteur:req.params.login})
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





router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
  res.send("Serveur à l'écoute");	
})

module.exports = { router };
