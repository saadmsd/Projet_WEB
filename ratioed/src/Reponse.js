import React from "react";
import { useState } from "react";
import axios from "axios";


function Reponse(props){
    
    const {currentUser, commentaire} = props;
    const [reponse, setReponse] = useState("");

    const handleReponse = () => {
        // Envoyer la réponse à l'aide d'une requête axios
        const configuration = {
            method: "POST",
            url: "/api/commentaire/reponse/"+commentaire.id,
            data: {
                auteur: currentUser,
                texte: reponse,
                date: new Date(),
                nbLike: 0,
            },
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setReponse("");
            }
            )
            .catch((error) => {
                console.log(error);
                console.log("error");
            }
            );
}




return(
    <div>
        <input type="text" placeholder="Votre reponse" onChange={(e) => setReponse(e.target.value)} value={reponse} name="reponse" />
            <button onClick={handleReponse}>Envoyer</button>
  </div>
);

}

export default Reponse;


