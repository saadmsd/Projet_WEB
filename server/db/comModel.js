const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
    auteur: String,
    texte: String,
    date: {Date, default: Date.now},
    nbLike: Number,
});

module.exports = mongoose.model.Commentaire || mongoose.model("Commentaire", userShema);
