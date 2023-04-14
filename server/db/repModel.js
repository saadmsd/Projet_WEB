//schema de reponse a un commentaire

const mongoose = require("mongoose");
const repShema = new mongoose.Schema({
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
        }
    },
    nbLike: {
        type: Number,
        default: 0,
    },
    likedBy: {
        type: [String],
        default: [],
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commentaire",
    }
});

module.exports = mongoose.model.Reponse || mongoose.model("Reponse", repShema);