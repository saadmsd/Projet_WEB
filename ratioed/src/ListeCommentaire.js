import { useState } from "react";
import Commentaire from "./Commentaire";
import NewComment from "./NewComment";

function ListeCommentaire(props) {
    /*Liste des commentaires*/
    const [commentaires, setCommentaires] = useState([
        {
            auteur: "User1",
            texte: "Ca dit quoi ?",
        },
        {
            auteur: "User2",
            texte: "Moi aussi je peux commenter ouuuuuuu",
        },
    ]);
    const [filtre , setFiltre] = useState("User2");

    const handleAddComment = (commentaire) => {
        setCommentaires([...commentaires, commentaire]);
    };

    return (
        <div>
            <NewComment addComment={handleAddComment} />
            {filtre === "Tous" ? ( commentaires.map((commentaire) => (
                <Commentaire auteur={commentaire.auteur} texte={commentaire.texte} />
            ))) : (commentaires.filter((commentaire) => commentaire.auteur === filtre).map((commentaire) => (
                <Commentaire auteur={commentaire.auteur} texte={commentaire.texte} />)))}
        </div>
    );
}

export default ListeCommentaire;
    