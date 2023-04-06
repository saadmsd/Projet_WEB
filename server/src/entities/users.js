const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://127.0.0.1/";
const dbName = 'Test';
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err) {
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection('users');
  // perform actions on the collection object
  client.close();
});

class Users{
    constructor(db){   
        this.db = db;
    }

    //ajoute un utilisateur a la base de donnees
    create(login, password, lastname, firstname){
        return new Promise((resolve, reject) => {
            this.db.collection('users').insertOne({ login, password, lastname, firstname }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

exports.default = Users;