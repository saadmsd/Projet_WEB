const express = require('express');
const path = require('path');
const { router } = require('./api.js');
// require database connection 


const app = express();

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

app.use(express.static(path.join(basedir, 'public')));
// Activer les en-têtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.use('/api', router);

// // register endpoint
// app.post("/user/", (request, response) => {
//     // hash the password
//     bcrypt
//       .hash(request.body.password, 10)
//       .then((hashedPassword) => {
//         // create a new user instance and collect the data
//         const user = new User({
//           login: request.body.login,
//           password: hashedPassword,
//           lastname: request.body.lastname,
//           firstname: request.body.firstname,
//         });
  
//         // save the new user
//         user
//           .save()
//           // return success if the new user is added to the database successfully
//           .then((result) => {
//             response.status(201).send({
//               message: "User Created Successfully",
//               result,
//             });
//           })
//           // catch error if the new user wasn't added successfully to the database
//           .catch((error) => {
//             response.status(500).send({
//               message: "Error creating user",
//               error,
//             });
//           });
//       })
//       // catch error if the password hash isn't successful
//       .catch((e) => {
//         response.status(500).send({
//           message: "Password was not hashed successfully",
//           e,
//         });
//       });
//   });

module.exports = app; // Export the app instance
