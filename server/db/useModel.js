const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        unique : false,
    },
});

module.exports = mongoose.model.User || mongoose.model("User", userShema);