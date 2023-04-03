import { useState } from "react";
import Auteur from "./Auteur";
import Texte from "./Texte";
import Bouton from "./Bouton";
import ListeReponse from "./ListeReponse";


function Commentaire(props){
    /*contient tout les elements d'un commentaire*/
    const [auteur, setAuteur] = useState(props.auteur);
    const [texte, setTexte] = useState(props.texte);

    return(
        <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "1em" }}>
                <Auteur auteur={auteur}/>
                <Texte texte={texte}/>
                <Bouton/>
                <ListeReponse/>
            </p>
      </div>
    );
}

export default Commentaire;