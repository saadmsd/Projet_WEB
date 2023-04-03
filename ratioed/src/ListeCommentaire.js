import { useState } from "react";
import Commentaire from "./Commentaire";

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

    return (
        <div>
            {commentaires.map((commentaire) => (
                <Commentaire
                    auteur={commentaire.auteur}
                    texte={commentaire.texte}
                />
            ))}
        </div>
    );
}

export default ListeCommentaire;
    