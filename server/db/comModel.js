const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
    auteur:{
        type : String,
    },
    texte:{
        type : String,
        required: [true, "Please enter a comment"],
    },
    date : {
        type : Date, 
        default: Date.now(),
        get: function(date) {
            return date.toISOString().slice(0, 10);
        }
    },
    nbLike: Number,
});

module.exports = mongoose.model.Commentaire || mongoose.model("Commentaire", userShema);
