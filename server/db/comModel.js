const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
    auteur: {
        type: String,
    },
    texte: {
        type: String,
    },
    date: {
        type: Date,
    },
    nbLike: {
        type: Number,
    },
});

module.exports = mongoose.model.Commentaire || mongoose.model("Commentaire", userShema);
