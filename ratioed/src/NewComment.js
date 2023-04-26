import { useState } from "react";
import axios from "axios";
import "./style/NewComment.css"

function NewComment(props) {

    const {currentUser, setCurrentUser} = props;

    const [comment, setComment] = useState("");
    const [nom , setNom] = useState("");
    const [prenom , setPrenom] = useState("");


    const handleAddComment = (e) => {
        e.preventDefault();
        const configuration = {
            method: "POST",
            url: "/api/commentaire/",
            data: {
                auteur: currentUser,
                texte: comment,
                date: new Date(),
                nbLike: 0,
            },
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setComment("");
                props.getCommentaires();
            })
            .catch((error) => {
                console.log(error);
                console.log("error");
            });
    };

    const handleComment = (e) => {
        setComment(e.target.value);
    };

    return (
        <div className="newComment">
            <textarea placeholder="Quoi de neuf ?" type="text" value={comment} onChange={handleComment} />
            <button onClick={handleAddComment}>Publier</button>
        </div>
    );
}

export default NewComment;