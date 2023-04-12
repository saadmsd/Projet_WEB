import { useState } from "react";
import axios from "axios";


function Commentaire(props){

    const [commentaire, setCommentaire] = useState(props.commentaire);
    const [like, setLike] = useState(false);

    const handleLike = () => {
        const configuration = {
            method: "PUT",
            url: "/api/commentaire/"+commentaire.id,
            data: {
                id : commentaire.id,
                nbLike: commentaire.nbLike + 1,
            },
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setCommentaire({...commentaire, nbLike: commentaire.nbLike + 1});
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
            <p>{props.formatDate(commentaire.date)}</p>
            <p>{commentaire.nbLike}</p>
            <button onClick={handleLike}>Like</button>
        </div>
    );

}

export default Commentaire;
