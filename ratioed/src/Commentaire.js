import { useState } from "react";
import axios from "axios";


function Commentaire(props){

    const {commentaire} = props;
    const [nbLike, setNbLike] = useState(commentaire.nbLike);
    const [like, setLike] = useState(false);

    const handleLike = () => {
        const configuration = {
            method: "PUT",
            url: "/api/commentaire/"+commentaire.id,
            data: { 
                nbLike: nbLike + 1,
            },
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setNbLike(nbLike + 1);
                setLike(true);
            })
            .catch((error) => {
                console.log(error);
        });
    };

    return (
        <div>
            <h3>{commentaire.auteur}</h3>
            <p>{commentaire.texte}</p>
            <p>{props.formatDate(props.commentaire.date)}</p>
            <p>{commentaire.nbLike}</p>
            <button onClick={handleLike}>Like</button>
        </div>
    );

    
    
}

export default Commentaire;