//schema de reponse a un commentaire

const mongoose = require("mongoose");
const repShema = new mongoose.Schema({
   
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
      parentId: {
        type: Number,
        required: true,
      },
});

module.exports = mongoose.model.Reponse || mongoose.model("Reponse", repShema);