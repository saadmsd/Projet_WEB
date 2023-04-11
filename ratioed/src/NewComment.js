import { useState } from "react";
import axios from "axios";


function NewComment(props) {

    const [comment, setComment] = useState("");
    const [auteur , setAuteur] = useState("");



    const getauteur = () => {
        const configuration = {
            method: "GET",
            url: "/api/user/",
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setAuteur(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleAddComment = (e) => {
        e.preventDefault();
        const configuration = {
            method: "POST",
            url: "/api/commentaire/",
            data: {
                auteur: getauteur(),
                texte: comment,
                date: new Date(),
                nbLike: 0,
            },
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                //props.addComment(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleComment = (e) => {
        setComment(e.target.value);
    };

    return (
        <div>
            <textarea type="text" value={comment} onChange={handleComment} />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
}

export default NewComment;