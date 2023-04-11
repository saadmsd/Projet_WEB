import { useState } from "react";
import axios from "axios";


function NewComment(props) {

    const {currentUser, setCurrentUser} = props;

    const [comment, setComment] = useState("");
    const [nom , setNom] = useState("");
    const [prenom , setPrenom] = useState("");
    //const [currentUser, setCurrentUser] = useState(null);

        // const getauteur = () => {
        //     const configuration = {
        //         method: "GET",
        //         url: "/api/user/"+props.currentUser,
        //     };
        //     axios(configuration)
        //         .then((response) => {
        //             console.log(response);
        //             setNom(response.data.result.lastname);
        //             setPrenom(response.data.result.firstname);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // };


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