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
    followers: {
        type: Array,
        required: false,
        unique : false,
    },
    following: {
        type: Array,
        required: false,
        unique : false,
    },
});

module.exports = mongoose.model.User || mongoose.model("User", userShema);