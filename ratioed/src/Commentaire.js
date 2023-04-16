import { useState } from "react";
import axios from "axios";
import Reponse from "./Reponse";


function Commentaire(props){

    const {currentUser} = props;
    const [commentaire, setCommentaire] = useState(props.commentaire);
    const [like, setLike] = useState(false);
    const [answer, setAnswer] = useState(false);

    const handleLike = () => {
        //verifier si l'utilisateur a deja like
        
        if(like === false){
            if(commentaire.likedBy.includes(currentUser) === false){
                const configuration = {
                    method: "PUT",
                    url: "/api/commentaire/like/"+commentaire._id,
                    data: {
                        auteur: currentUser,
                        nbLike: commentaire.nbLike + 1,
                    },
                };
                axios(configuration)
                    .then((response) => {
                        console.log(response);
                        setCommentaire(response.data.result);
                        setLike(true);
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

    const handleAnswer = () => {
        if(answer === false){
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    }

    return (
        <div>
            <h3>{commentaire.auteur}</h3>
            <p>{commentaire.texte}</p>
            <p>{props.formatDate(commentaire.date)}</p>
            <p>{commentaire.nbLike} likes</p>
            <button onClick={handleLike}>
            <img src="https://img.icons8.com/ios/50/000000/like--v1.png" alt="like" />
            </button>
            {answer === false ? <button onClick={handleAnswer}>Répondre</button> : <button onClick={handleAnswer}>Annuler</button>}
            {answer === true ? <div>
                <Reponse currentUser={currentUser} commentaire={commentaire} />
            </div> : null}
        </div>
    );

}

export default Commentaire;
