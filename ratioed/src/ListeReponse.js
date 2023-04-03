import React from "react";
import { useState } from "react";
import Reponse from "./Reponse";

function ListeReponse(props) {
    const [reponses, setReponses] = useState([
        {
            auteur: "User3",
            texte: "Quoicoubeh",
        },
    ]);

    return (
        <div>
            {reponses.map((reponse) => (
                <Reponse
                    auteur={reponse.auteur}
                    texte={reponse.texte}
                />
            ))}
        </div>
    );
}

export default ListeReponse;