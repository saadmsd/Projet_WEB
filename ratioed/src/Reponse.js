import React from "react";
import { useState } from "react";
import Auteur from "./Auteur";
import Texte from "./Texte";
import Bouton from "./Bouton";
import Like from "./Like";

function Reponse(props){
    /*contient tout les elements d'une reponse*/
    const [auteur, setAuteur] = useState(props.auteur);
    const [texte, setTexte] = useState(props.texte);

    return(
        <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "1em" }}>
                <Auteur auteur={auteur}/>
                <Texte texte={texte}/>
                <Like/>
            </p>
      </div>
    );
}

export default Reponse;


