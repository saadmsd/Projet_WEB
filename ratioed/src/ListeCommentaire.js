import { useState } from "react";
import Commentaire from "./Commentaire";
import axios from "axios";

function ListeCommentaire(props) {
    
    const [commentaires, setCommentaires] = useState([]);

    const getCommentaires = () => {
        const configuration = {
            method: "GET",
            url: "/api/commentaire/",
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setCommentaires(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }

    
    return (
        <div>
            <h2>Commentaires</h2>
            <button onClick={getCommentaires}>Get Commentaires</button>
            {commentaires.map((commentaire) => (
                <Commentaire key={commentaire.id} commentaire={commentaire} formatDate={formatDate} />
            ))}
        </div>
    );

}

export default ListeCommentaire;
    