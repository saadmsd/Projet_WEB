import { useState } from "react";
import Auteur from "./Auteur";
import Texte from "./Texte";
import Bouton from "./Bouton";
import ListeReponse from "./ListeReponse";


function Commentaire(props){
    
    const [reponses, setReponses] = useState([]);
    const [newReponse, setNewReponse] = useState(false);
    const [nbLikes, setNbLikes] = useState(props.commentaire.nbLikes);

    const addReponse = (reponse) => {
        setReponses([...reponses, reponse]);
        setNewReponse(false);
    }

    const like = () => {
        setNbLikes(nbLikes + 1);
    }

    //<Bouton texte="Répondre" onClick={() => setNewReponse(!newReponse)} />
    // {newReponse && <ListeReponse addReponse={addReponse} />}
    // {reponses.map((reponse) => (
    //     <ListeReponse key={reponse.id} reponse={reponse} />
    // ))}

    return (
        <div className="commentaire">
            <Auteur auteur={props.commentaire.auteur} />
            <Texte texte={props.commentaire.texte} />
            <Bouton texte="Like" onClick={like} />
            <span>{nbLikes} likes</span>
        </div>
    );
}

export default Commentaire;