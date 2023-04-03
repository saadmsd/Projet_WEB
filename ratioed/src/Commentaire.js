import { useState } from "react";
import Auteur from "./Auteur";
import Texte from "./Texte";
import Bouton from "./Bouton";


function Commentaire(props){
    /*contient tout les elements d'un commentaire*/
    const [auteur, setAuteur] = useState(props.auteur);
    const [date, setDate] = useState(props.date);
    const [heure, setHeure] = useState(props.heure);
    const [texte, setTexte] = useState(props.texte);
    const [like, setLike] = useState(props.like);
    const [dislike, setDislike] = useState(props.dislike);
    const [reponse, setReponse] = useState(props.reponse);
    const [repondre, setRepondre] = useState(props.repondre);
    
    return(
        <div>
            <Auteur auteur={auteur}/>
            <Texte texte={texte}/>
            <Bouton/>
        </div>
    );
}

export default Commentaire;