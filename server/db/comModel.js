//Model pour un commentaire

const mongoose = require("mongoose");
const comShema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
      },
      auteur: {
        type: String,
        required: true,
      },
      texte: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
        get: function (date) {
          return date.toISOString().slice(0, 10);
        },
      },
      nbLike: {
        type: Number,
        default: 0,
      },
      likedBy: {
        type: [String],
        default: [],
        required: false,
      },
});


module.exports = mongoose.model.Commentaire || mongoose.model("Commentaire", comShema);
