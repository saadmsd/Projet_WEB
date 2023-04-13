//Model pour un commentaire

const mongoose = require("mongoose");
const comShema = new mongoose.Schema({
    id : {
        type : Number,
        unique: true,
        required: false,
    },
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
        },
        required: false,
    },
    nbLike: {
        type: Number,
        default: 0,
    },
    likedBy: {
        type: [String],
        default: [],
    },
    response: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commentaire",
    }
});


module.exports = mongoose.model.Commentaire || mongoose.model("Commentaire", comShema);
