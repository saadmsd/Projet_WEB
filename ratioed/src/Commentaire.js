import { useState } from "react";
import axios from "axios";


function Commentaire(props){

    const {currentUser} = props;
    const [commentaire, setCommentaire] = useState(props.commentaire);
    const [like, setLike] = useState(false);

    const handleLike = () => {
        //verifier si l'utilisateur a deja like
        
        if(like === false){
            if(commentaire.likedBy.includes(currentUser) === false){
                const configuration = {
                    method: "PUT",
                    url: "/api/commentaire/"+commentaire.id,
                    data: {
                        auteur: commentaire.auteur,
                        texte: commentaire.texte,
                        date: commentaire.date,
                        nbLike: commentaire.nbLike+1,
                    },
                };
                axios(configuration)
                    .then((response) => {
                        console.log(response);
                        setCommentaire(response.data.result);
                        setLike(true);
                        console.log(commentaire.likeBy);
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("error");
                    });
            } else {
                setLike(true);
            }
        }
    }


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
