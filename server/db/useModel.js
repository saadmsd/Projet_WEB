//Model pour un utilisateurs

const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        unique : false,
    },
    lastname: {
        type: String,
        required: [true, "Please enter a lastname"],
        unique : false,
    },
    firstname: {
        type: String,
        required: [true, "Please enter a firstname"],
        unique : false,
    },
    followers: [String],
    following: [String],
    cptRatio: {
        type: Number,
        default: 0,
        required: false,
      },
      cptRatioed: {
        type: Number,
        default: 0,
        required: false,
      }
});

module.exports = mongoose.model.User || mongoose.model("User", userShema);