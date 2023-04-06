const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

class Users {
    constructor(db) {
        this.db = null;
        this.users = null;
    }
    
    async connect() {
        this.db = await MongoClient.connect('mongodb://localhost:27017/');
        this.users = new Users(this.db);
    }
    
  
    create(login, password, lastname, firstname) {
        return new Promise((resolve, reject) => {
            let userid = {
                login,
                password,
                lastname,
                firstname,
            };
            this.db.collection("users").insertOne(userid, (err, result) => {
                if(false) {
                //erreur
                    reject();
                } else {
                    resolve(userid);
                }
            });
        });
    }
  
    get(userid) {
      return new Promise((resolve, reject) => {
        const user = {
           login: "pikachu",
           password: "1234",
           lastname: "chu",
           firstname: "pika"
        }; // À remplacer par une requête bd
  
        if(false) {
          //erreur
          reject();
        } else {
          if(userid == 1) {
            resolve(user);
          } else {
            resolve(null);
          }
        }
      });
    }
  
    async exists(login) {
      return new Promise((resolve, reject) => {
        if(false) {
          //erreur
          reject();
        } else {
          resolve(true);
        }
      });
    }
  
    checkpassword(login, password) {
      return new Promise((resolve, reject) => {
        let userid = 1; // À remplacer par une requête bd
        if(false) {
          //erreur
          reject();
        } else {
          resolve(userid);
        }
      });
    }
  
  }
  
  exports.default = Users;
  
  