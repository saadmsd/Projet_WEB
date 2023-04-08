import { useState } from "react";
import Commentaire from "./Commentaire";
import NewComment from "./NewComment";
import axios from "axios";

function ListeCommentaire(props) {
    //Récupérer les commentaires de la base de données
    const [commentaires, setCommentaires] = useState([]);
    const [newComment, setNewComment] = useState(false);
    
    const getCommentaires = () => {
        axios.get("http://localhost:3000/api/commentaire")
        .then((response) => {
            setCommentaires(response.data.result);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const addComment = (comment) => {
        axios.post("http://localhost:3000/api/commentaire", comment)
        .then((response) => {
            console.log(response);
            getCommentaires();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    
    return (
        <div>
            <h2>Commentaires</h2>
            <button onClick={() => setNewComment(!newComment)}>Ajouter un commentaire</button>
            {newComment && <NewComment addComment={addComment} />}
            {commentaires.map((commentaire) => (
                <Commentaire key={commentaire._id} commentaire={commentaire} />
            ))}
        </div>
    );

}

export default ListeCommentaire;
    