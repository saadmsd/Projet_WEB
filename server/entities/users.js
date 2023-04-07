//CE fichier contient les fonctions qui permettent de gerer les utilisateurs grace a la base de donnees mongoDB

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "Test";
const collection = "Users";

//creer une classe qui permet de gerer les utilisateurs

class Users {
    constructor(db) {
      this.db = db;
    }
  
    async create(login, password, lastname, firstname) {
      const user = {
        login: login,
        password: password,
        lastname: lastname,
        firstname: firstname
      };
  
      try {
        const result = await this.collection.insertOne(user);
        return result.insertedId;
      } catch (err) {
        console.error(`Failed to create user: ${err}`);
        throw err;
      }
    }
  
    async get(userid) {
      try {
        const user = await this.collection.findOne({ _id: new ObjectId(userid) });
        return user;
      } catch (err) {
        console.error(`Failed to get user with id ${userid}: ${err}`);
        throw err;
      }
    }
  
    async exists(login) {
      try {
        const user = await this.collection.findOne({ login: login });
        return user !== null;
      } catch (err) {
        console.error(`Failed to check if user ${login} exists: ${err}`);
        throw err;
      }
    }
  
    async checkpassword(login, password) {
      try {
        const user = await this.collection.findOne({ login: login });
        if (user === null) {
          return null;
        }
        if (user.password === password) {
          return user._id;
        }
        return null;
      } catch (err) {
        console.error(`Failed to check password for user ${login}: ${err}`);
        throw err;
      }
    }
  }
  exports.default = Users;

